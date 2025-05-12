const Stripe = require("stripe");
const ReserveModel = require("../Models/Reservation");

const mongoose = require("mongoose");
const axios = require("axios");
const stripe = require("../stripeClient");
const frontend_url = "http://localhost:5173";

const placeOrder = async (req, res) => {
  try {
    let user;
    let Flight;
    const { userId, flightId } = req.params;
    const { flightData } = req.body;
    const {
      flightClass,
      personCount,
      childrenAges,
      specialRequest,
      paymentStatus,
      TotalPrice,
    } = flightData;

    try {
      const [userResponse, flightResponse] = await Promise.all([
        axios.get(`http://localhost:4000/user/user/getuser/${userId}`),
        axios.get(`http://localhost:4000/flight/flight/${flightId}`),
      ]);

      user = userResponse.data.user;

      Flight = flightResponse.data;
    } catch (error) {
      console.log("Error getting flight & user:", error.message);
    }

    if (user && Flight) {
      const newOrder = new ReserveModel({
        user: new mongoose.Types.ObjectId(userId),
        flight: new mongoose.Types.ObjectId(flightId),
        flightClass,
        personCount,
        childrenAges,
        specialRequest,
        paymentStatus,
        TotalPrice,
      });

      await newOrder.save();

      {
        /* try {
        const updateUser = await axios.put(
          `http://localhost:4000/user/user/updateuser/${userId}`,
          { reservations: newOrder._id }
        );
      } catch (error) {
        console.log("Error updating user during reservation process");
      } */
      }

      const line_items = [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: `Flight Reservation - ${Flight.name || "Flight"}`, // ou un nom générique
            },
            unit_amount: newOrder.TotalPrice * 100, // Stripe veut le prix en CENTIMES
          },
          quantity: 1,
        },
      ];
      const session = await stripe.checkout.sessions.create({
        line_items,
        mode: "payment",
        success_url: `${frontend_url}/verify?type=vol&success=true&orderId=${newOrder._id}`,
        cancel_url: `${frontend_url}/verify?type=vol&success=false&orderId=${newOrder._id}`,
      });

      return res.status(200).json({ success: true, session_url: session.url });
    } else {
      return res
        .status(404)
        .json({ success: false, message: "User or flight not found" });
    }
  } catch (error) {
    console.error("Payment Error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.params;
  let flight;
  try {
    if (success === "true") {
      const order = await ReserveModel.findById(orderId);

      if (!order)
        return res
          .status(404)
          .json({ success: false, message: "Order not found" });

      const totalPassengers =
        order.personCount.Adultes + order.personCount.Enfants;
      try {
        const flightf = await axios.get(
          `http://localhost:4000/flight/flight/${order.flight}`
        );

        flight = flightf.data.flightData;
        if (!flight) {
          res
            .status(404)
            .json({ message: "Error while getting flight for verification " });
        }
      } catch (error) {
        console.log("Error while getting flight for verification ", error);
      }

      for (let i = 0; i < flight?.classes.length; i++) {
        let cls = flight?.classes[i];

        if (cls.name === order?.flightClass) {
          if (cls.availableSeats < totalPassengers) {
            return res
              .status(400)
              .json({ success: false, message: "Not enough seats available" });
          }

          cls.availableSeats -= totalPassengers;

          if (cls.availableSeats === 0) {
            flight.classes.splice(i, 1);
            i--;
          }
        }
      }

      await flight.save();

      order.paymentStatus = "Paid";
      await order.save();
      res.status(200).json({
        success: true,
        message: "Payment successful and seats updated",
      });
    } else {
      await ReserveModel.findByIdAndDelete(orderId);
      res.status(400).json({
        success: false,
        message: "Payment canceled and order deleted",
      });
    }
  } catch (error) {
    console.error("Verify Order Error:", error);
    res.status(500).json({ success: false, message: "Error verifying order" });
  }
};

// 👤 User Orders
const userOrders = async (req, res) => {
  try {
    const orders = await ReserveModel.find({ user: req.params.userId });

    const formatOrders = await Promise.all(
      orders.map(async (order) => {
        try {
          const userResponse = await axios.get(
            `http://localhost:4000/flight/flight/${order.flight}`
          );
          return {
            ...order.toObject(),
            flight: userResponse.data,
          };
        } catch (error) {
          console.error(`Error fetching flight:${order.flight}`, error.message);
          return {
            ...order.toObject(),
            flight: null,
          };
        }
      })
    );
    return res.status(200).json(formatOrders);
  } catch (error) {
    console.error("User Orders Error:", error);
    return res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// 🧾 All Orders (Admin)
const listOrders = async (req, res) => {
  try {
    const orders = await ReserveModel.find({});
    console.log(orders)
    const formatOrders = await Promise.all(
      orders.map(async (order) => {
        try {
          const [userResponse, flightResponse] = await Promise.all([
            axios.get(
              `http://localhost:4000/user/user/getuser/${order.userId}`
            ),
            axios.get(`http://localhost:4000/flight/flight/${order.flight}`),
          ]);
          return {
            ...order.toObject(),
            user: userResponse.data.user,
            flight: flightResponse.data.flight,
          };
        } catch (err) {
          console.error(
            `Erreur lors du fetch des infos pour la commande ${order._id}`,
            err
          );
          return order;
        }
      })
    );
    res.status(200).json({ success: true, data: formatOrders });
  } catch (error) {
    console.error("List Orders Error:", error);
    res.status(500).json({ success: false, message: "Error fetching orders" });
  }
};

// 🛠 Update Order Status
const updateStatus = async (req, res) => {
  try {
    await ReserveModel.findByIdAndUpdate(req.body.reserveId, {
      status: req.body.status,
    });
    res.status(200).json({ success: true, message: "Status updated" });
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
