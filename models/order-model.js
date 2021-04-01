const mongoose = require('mongoose');

const mongoOrderSchema = new mongoose.Schema({
  productName: String,
  productSize: String,
  productPrize: String,
  createdAt: String,
  deliveryMethod: String,
  deliveryAddress: String,
  userId: String
});

module.exports = new mongoose.model('Order', mongoOrderSchema);
