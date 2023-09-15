const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Email should be unique
  },
  location: String, // Location is optional
  weatherData: {
    type: Array, // You can store weather data as an array
    default: [], // Default to an empty array
  },
  // You can add more fields as needed
});

const User = mongoose.model('User', userSchema);

module.exports = User;
