const mongoose = require('mongoose');

const flightSchema = new mongoose.Schema({
  from: { type: String, required: true },
  to: { type: String, required: true },
  departurePlace: { type: String, required: true },
  departureAirport: { type: String, required: true },
  returnPlace: { type: String, required: true }, 
  returnAirport: { type: String, required: true },
  duration: { type: String, required: true },
  airline: { type: String, required: true },
  departureDate: { type: Date, required: true },
  returnDate: { type: Date, required: true },
  flightType: { 
    type: String, 
    enum: ['one-way', 'round-trip'], 
    default: 'round-trip',
    required: true 
  },
  onboardServices: { type: [String], default: [] },
  classes: [
    {    _id: false,
      name: { type: String, required: true },
      price: { type: Number, required: true },
      availableSeats: { type: Number, required: true }
    }
  ],
  flightNumber: { type: String, unique: true, required: true },
  departureTime: { type: String, required: true },
  returnTime: { type: String, required: true },
  Includedbaggage: {
    included: { type: Boolean, default: false },
    weight: { type: Number, default: 0 }
  },
  cabinAllowance: { type: Number, default: 0 },
  refundable: { type: Boolean, default: false }
},{timestamps:true});

const flight = mongoose.models.flight || mongoose.model('flight', flightSchema);
module.exports = flight;
