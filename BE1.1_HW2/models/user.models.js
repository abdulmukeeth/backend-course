const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  birthdate: {
    type: Date,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  profilePictureUrl: {
    type: String,
  },
}, { timestamps: true });

const User = mongoose.model('UserProfile', UserSchema);
module.exports = User;
