const mongoose = require("mongoose");

// --- Room Type Schema ---
const roomTypeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  area: { type: Number, required: true, min: 0 },
  beds: [{
    typeBed: { type: String, required: true, trim: true },
    number: { type: Number, required: true, min: 1 }
  }],
  capacity: { type: Number, required: true, min: 1 },
  amenities: { type: [String], default: [] },
  roomNumber: { type: String, required: true, trim: true },
  availableRooms: { type: Number, required: true, min: 0 },
  roomImages: { type: [String], default: [] },
  pricingByDate: [{
    StartDate: { type: Date, required: true },
    EndDate: { type: Date, required: true },
    price: { type: Number, required: true, min: 0 },
    availableRooms: { type: Number, required: true, min: 0 }
  }],
  RoomImagesCount: { type: Number, default: 0, min: 0 }
}, { _id: false });

// --- Features Type Schema ---
const FeaturesTypeSchema = new mongoose.Schema({
  petsAllowed: { type: Boolean, default: false },
  hasRestaurant: { type: Boolean, default: false },
  hasPool: { type: Boolean, default: false },
  hasSpa: { type: Boolean, default: false },
  hasGym: { type: Boolean, default: false },
  hasParking: { type: Boolean, default: false },
  hasWifi: { type: Boolean, default: false },
  hasBeach: { type: Boolean, default: false },
  hasBar: { type: Boolean, default: false },
  weather: { type: String, trim: true }
}, { _id: false });

// --- Accommodation Schema ---
const accommodationSchema = new mongoose.Schema({
  name: { type: String, required: true,unique:true, trim: true },
  country: { type: String, required: true, trim: true },
  city: { type: String, required: true, trim: true },
  languagesSpoken: { type: [String], required: true, default: [] },
  address: { type: String, required: true, trim: true },
  stars: { type: Number, min: 1, max: 5, default: 3 },
  checkInTime: { type: String, required: true },
  checkOutTime: { type: String, required: true },
  TotalRooms: { type: Number, required: true, min: 1 },
  TotalFloors: { type: Number, required: true, min: 1 },
  Email: { type: String, required: true, trim: true },
  Phone: { type: String, required: true, trim: true },
  ReservationPhone: { type: String, required: true, trim: true },
  minAgeToCheckIn: { type: Number, required: true, min: 0 },
  description: { type: String, required: true, trim: true },
  type: { type: String, required: true, trim: true }, // hotel, resort, hostel, etc.
  images: { type: [String], required: true, default: [] },
  roomTypes: { type: [roomTypeSchema], required:true },
  offers: { type: mongoose.Schema.Types.ObjectId, ref: "Offer", default: null },
  features: { type: FeaturesTypeSchema, default: {} },
  activities: { type: [String], default: [] }
});

module.exports = mongoose.model("Accommodation", accommodationSchema);
