const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: String,
  size: String,
  categoryId: String
});

module.exports = new mongoose.model('Product', productSchema);
