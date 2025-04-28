const Stripe = require("stripe");
const HotelReservationModel = require("../Models/HotelReservationSchema");
const userModel = require("../Models/User");
const mongoose=require('mongoose')
const stripe = new Stripe("sk_test_51RBMXo4FlSbelSuKp15qkCFl65CTopoEuNZcQ5pIjYp0rJjoHazQIQkaunaimiOvL6enfref6slxKJRmfvx11w1q003oe4GUPp");
const Accommodation = require('../Models/Accomodation');

const frontend_url = "http://localhost:5173";

// 🛒 Place Order
const placeOrder = async (req, res) => {
  try {
    const { userId, accId } = req.params;
    const { reservationData } = req.body;
    const {
      RoomsSelection,
      personCount,
      checkInDate,
        checkOutDate,
      childrenAges,
      specialRequest,
      paymentStatus,
      TotalPrice
    } = reservationData;
    const now = new Date();
const checkIn = new Date(checkInDate);
const checkOut = new Date(checkOutDate);

if (checkIn <= now || checkOut <= now) {
  return res.status(400).json({ success: false, message: "Les dates doivent être dans le futur." });
}

if (checkOut <= checkIn) {
  return res.status(400).json({ success: false, message: "La date de départ doit être après la date d’arrivée." });
}
    // On attend les recherches
    const user = await userModel.findById(userId);
    const acc = await Accommodation.findById(accId); 
    console.log(req.body)
    
    if (user && acc) {
      const newOrder = new HotelReservationModel({
        user: new mongoose.Types.ObjectId(userId),
        accommodation: new mongoose.Types.ObjectId(accId),
        RoomsSelection,
        checkInDate,
        checkOutDate,
        personCount,
        childrenAges,
        specialRequest,
        paymentStatus,
        TotalPrice
      });
    
      await newOrder.save();
     
    // Tu peux lier l'utilisateur s'il y a des updates à faire :
    await userModel.findByIdAndUpdate(userId, { $push: { Accreservations: newOrder._id } });

    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Room Reservation - ${acc.name || "Accommodation"}`, // ou un nom générique
          },
          unit_amount: newOrder.TotalPrice * 100, // Stripe veut le prix en CENTIMES
        },
        quantity: 1
      }
    ];
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?type=acc&success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?type=acc&success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } else {
    res.status(404).json({ success: false, message: "User or Accommodation not found" });
  }
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Verify Payment
const verifyOrder = async (req, res) => {
  const { orderId, success} = req.params;

  try {
    if (success === "true") {
      const order = await HotelReservationModel.findById(orderId);
      if (!order) return res.status(404).json({ success: false, message: "Order not found" });

      const acc = await Accommodation.findById(order.accommodation); // 🔁 fix
      if (!acc) return res.status(404).json({ success: false, message: "Accommodation not found" });

      const checkIn = new Date(order.checkInDate);
      const checkOut = new Date(order.checkOutDate);
      console.log("aaaaaaaa")
      for (const selection of order.RoomsSelection) {
        const roomType = acc.roomTypes.find(r => r.name === selection.name);
        if (!roomType) {
          return res.status(400).json({ success: false, message: `Room type ${selection.name} not found` });
        }

        const result = checkAvailabilityAndUpdate(roomType, checkIn, checkOut, selection.number);
        if (!result.success) {
          return res.status(400).json({ success: false, message: result.message });
        }
      }

      // Sauvegarde les changements
      await acc.save();
      order.paymentStatus = "Paid";
      await order.save();

      res.json({ success: true, message: "Payment successful and room availability updated" });

    } else {
      await HotelReservationModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment canceled and order deleted" });
    }

  } catch (error) {
    console.error("Verify Order Error:", error);
    res.status(500).json({ success: false, message: "Error verifying order" });
  }
};

const checkAvailabilityAndUpdate = (roomType, checkInDate, checkOutDate, numberRequested) => {
  const start = new Date(checkInDate);
  const end = new Date(checkOutDate);

  // Liste des dates de séjour
  const stayDates = [];
  for (let d = new Date(start); d < end; d.setDate(d.getDate() + 1)) {
    stayDates.push(new Date(d));
  }

  // Pour suivre les dates sans pricing
  let fallbackCount = 0;

  // Vérifier les disponibilités pour chaque date
  for (const date of stayDates) {
    const pricing = roomType.pricingByDate.find(p =>
      new Date(p.StartDate) <= date && new Date(p.EndDate) >= date
    );

    if (pricing) {
      if (pricing.availableRooms < numberRequested) {
        return { success: false, message: `Pas assez de chambres disponibles pour la date ${date.toDateString()}` };
      }
    } else {
      // Si pas de pricing, on utilisera availableRooms du roomType global
      fallbackCount++;
    }
  }

  // Vérifier disponibilité globale si fallback
  if (fallbackCount > 0 && roomType.availableRooms < numberRequested) {
    return { success: false, message: "Pas assez de chambres disponibles par défaut (hors saison)." };
  }

  // Tout est ok : on met à jour les dispos
  for (const date of stayDates) {
    const pricing = roomType.pricingByDate.find(p =>
      new Date(p.StartDate) <= date && new Date(p.EndDate) >= date
    );

    if (pricing) {
      pricing.availableRooms -= numberRequested;
    }
  }

  if (fallbackCount > 0) {
    roomType.availableRooms -= numberRequested;
  }

  return { success: true };
};

// 👤 User Orders
const userOrders = async (req, res) => {
  try {
    const orders = await HotelReservationModel.find({ user: req.params.userId }).populate("accommodation");
    res.json({ success: true,orders });
  } catch (error) {
    console.error("User Orders Error:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// 🧾 All Orders (Admin)
const listOrders = async (req, res) => {
  try {
    const orders = await HotelReservationModel.find({}).populate("user").populate("accommodation");
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("List Orders Error:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// 🛠 Update Order Status
const updateStatus = async (req, res) => {
  try {
    await HotelReservationModel.findByIdAndUpdate(req.body.reserveId, { status: req.body.status });
    res.json({ success: true, message: "Status updated" });
  } catch (error) {
    console.error("Status Update Error:", error);
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};


module.exports = {
  listOrders,
  placeOrder,
  verifyOrder,
  updateStatus,
  userOrders,
};
