const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  password: { type: String, required: true },
  avatar: String,
  isHost: { type: Boolean, default: false },
  bio: String,
  savedMeals: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Meal' }],
  ratings: [{ type: Number }],
  avgRating: { type: Number, default: 0 },
  totalRatings: { type: Number, default: 0 },
  isVerified: { type: Boolean, default: false },
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);