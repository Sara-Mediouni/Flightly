const Stripe = require("stripe");
const ReserveModel = require("../Models/Reservation");
const userModel = require("../Models/User");
const flight = require("../Models/Flight");
const mongoose=require('mongoose')
const stripe = new Stripe("sk_test_51RBMXo4FlSbelSuKp15qkCFl65CTopoEuNZcQ5pIjYp0rJjoHazQIQkaunaimiOvL6enfref6slxKJRmfvx11w1q003oe4GUPp");

const frontend_url = "http://localhost:5173";

// 🛒 Place Order
const placeOrder = async (req, res) => {
  try {
    const { userId, flightId } = req.params;
    const { flightData } = req.body;
    const {
      flightClass,
      personCount,
      childrenAges,
      specialRequest,
      paymentStatus,
      TotalPrice
    } = flightData;
    
    // On attend les recherches
    const user = await userModel.findById(userId);
    const Flight = await flight.findById(flightId); // remplace "flight" par le vrai nom de ton modèle
    console.log(req.body)
    
    if (user && Flight) {
      const newOrder = new ReserveModel({
        user: new mongoose.Types.ObjectId(userId),
        flight: new mongoose.Types.ObjectId(flightId),
        flightClass,
        personCount,
        childrenAges,
        specialRequest,
        paymentStatus,
        TotalPrice
      });
    
      await newOrder.save();
     
    // Tu peux lier l'utilisateur s'il y a des updates à faire :
    await userModel.findByIdAndUpdate(userId, { $push: { reservations: newOrder._id } });

    const line_items = [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: `Flight Reservation - ${Flight.name || "Flight"}`, // ou un nom générique
          },
          unit_amount: newOrder.TotalPrice * 100, // Stripe veut le prix en CENTIMES
        },
        quantity: 1
      }
    ];
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?type=vol&success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?type=vol&success=false&orderId=${newOrder._id}`,
    });

    res.json({ success: true, session_url: session.url });
  } else {
    res.status(404).json({ success: false, message: "User or flight not found" });
  }
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

// ✅ Verify Payment
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.params;

  try {
    if (success === "true") {
      // ✅ Mettre à jour l'état de paiement
      const order = await ReserveModel.findById(orderId);
      if (!order) return res.status(404).json({ success: false, message: "Order not found" });

      // ✅ Mettre à jour les sièges disponibles
      const totalPassengers = order.personCount.Adultes + order.personCount.Enfants;

      const flightf = await flight.findById(order.flight);
      for (let i = 0; i < flightf.classes.length; i++) {
        let cls = flightf.classes[i];
      
        if (cls.name === order.flightClass) {
          if (cls.availableSeats < totalPassengers) {
            return res.status(400).json({ success: false, message: "Not enough seats available" });
          }
      
          cls.availableSeats -= totalPassengers;
      
          if (cls.availableSeats === 0) {
            // Supprimer la classe
            flightf.classes.splice(i, 1);
            i--; // Très important si tu modifies le tableau pendant la boucle
          }
        }
      }
      
      
     
      
      await flightf.save();

      order.paymentStatus = "Paid";
      await order.save();

      res.json({ success: true, message: "Payment successful and seats updated" });

    } else {
      await ReserveModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment canceled and order deleted" });
    }
  } catch (error) {
    console.error("Verify Order Error:", error);
    res.status(500).json({ success: false, message: "Error verifying order" });
  }
};

// 👤 User Orders
const userOrders = async (req, res) => {
  try {
    const orders = await ReserveModel.find({ user: req.params.userId }).populate("flight");
    res.json({ success: true,orders });
  } catch (error) {
    console.error("User Orders Error:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// 🧾 All Orders (Admin)
const listOrders = async (req, res) => {
  try {
    const orders = await ReserveModel.find({}).populate("user").populate("flight");
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("List Orders Error:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// 🛠 Update Order Status
const updateStatus = async (req, res) => {
  try {
    await ReserveModel.findByIdAndUpdate(req.body.reserveId, { status: req.body.status });
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
