const mongoose = require('mongoose');

const mongoProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  categoryId: {
    type: String,
    required: true
  }
});

module.exports = new mongoose.model('Product', mongoProductSchema);
