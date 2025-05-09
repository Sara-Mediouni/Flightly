const mongoose = require('mongoose');

const reserveSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  flight: { type: mongoose.Schema.Types.ObjectId, ref: "flight", required: true },
  flightClass:{type:String},
  personCount: {
    Adultes: { type: Number },
    Enfants: { type: Number }
  },

  childrenAges: [{ type: Number }],
  
  specialRequest: { type: String, default: "" },

  paymentStatus: {
    type: String,
    enum: ["Pending", "Paid", "Failed"],
    default: "Pending"
  },

  TotalPrice: { type: Number, required: true }
}, {
  timestamps: true // optionnel : ajoute createdAt et updatedAt automatiquement
});

const ReserveModel = mongoose.models.reservation || mongoose.model("reservation", reserveSchema);
module.exports = ReserveModel;
