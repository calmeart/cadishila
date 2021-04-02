const mongoose = require('mongoose');

const mongoOrderSchema = new mongoose.Schema({
  productName: String,
  productSize: String,
  productPrice: String,
  createdAt: String,
  deliveryMethod: String,
  deliveryAddress: String,
  userId: String,
  status: String,
  deliveredAt: String
});

module.exports = new mongoose.model('Order', mongoOrderSchema);
