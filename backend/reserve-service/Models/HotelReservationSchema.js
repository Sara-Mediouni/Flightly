const mongoose = require('mongoose');


const  RoomSelectionSchema = new mongoose.Schema({
     name:String,
     number:Number
})

const hotelReservationSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  accommodation: { type: mongoose.Schema.Types.ObjectId, ref: "Accommodation" },
  RoomsSelection: 
  [
   RoomSelectionSchema
  ],
  checkInDate: { type: Date, required: true },
  checkOutDate: { type: Date, required: true },
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

  TotalPrice: { type: Number, required: true },
 
},{
    timestamps: true // optionnel : ajoute createdAt et updatedAt automatiquement
  });

const HotelReservationModel = mongoose.models.hotelReservation || mongoose.model("hotelReservation", hotelReservationSchema);

module.exports = HotelReservationModel;
