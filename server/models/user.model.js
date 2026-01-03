const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, trim: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['Athlete', 'Coach', 'Sponsor'] },
  sport: { type: String, required: true },
  location: { type: String, required: true },
  profilePictureUrl: { type: String, required: true }, // Will store the base64 string
  // Default stats for new users
  districtRank: { type: Number, default: 0 },
  stateRank: { type: Number, default: 0 },
  totalScore: { type: Number, default: 0 },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

const User = mongoose.model('User', userSchema);

module.exports = User;