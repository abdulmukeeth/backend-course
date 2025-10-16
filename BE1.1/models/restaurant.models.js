const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  cuisine: [{
    type: String,
    enum: [
      'Italian', 'Mexican', 'Chinese', 'Indian', 'American', 'French','Japanese', 'Mediterranean', 'Thai', 'Vegetarian', 'Vegan', 'Other'
    ],
  }],
  location: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  openingYear: {
    type: Number,
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  specialDishes: [{
    type: String,
  }],
  photoUrls: [{
    type: String,
  }],
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurant', restaurantSchema);
module.exports = Restaurant;
