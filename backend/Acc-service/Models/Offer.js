const mongoose = require('mongoose');

const offerSchema = new mongoose.Schema({
  title: String,
  description: String,
  discountPercentage: Number,
  validFrom: Date,
  validTo: Date,
  cancellationPolicy: String,
  includedServices: [String],
  maxOccupancy: Number

},{timestamps:true});

module.exports = mongoose.model('Offer', offerSchema);
