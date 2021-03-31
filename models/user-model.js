const mongoose = require('mongoose');

const mongoUserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    minLength: 5,
    maxLength: 50,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isMember: {
    type: Boolean,
    default: false
  }
});

module.exports = new mongoose.model('User', mongoUserSchema);
