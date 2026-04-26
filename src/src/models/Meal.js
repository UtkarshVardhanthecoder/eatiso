const mongoose = require('mongoose');

const mealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  cuisine: { type: String, required: true },
  price: { type: Number, required: true },
  images: [String],
  host: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  location: { type: String, required: true },
  coordinates: { lat: Number, lng: Number },
  maxGuests: { type: Number, default: 10 },
  menu: [String],
  dietary: [String],
  availability: [{ date: Date, slots: [String] }],
  isActive: { type: Boolean, default: true },
  ratings: [{ type: Number }],
  avgRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  totalBookings: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('Meal', mealSchema);