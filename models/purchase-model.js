const mongoose = require('mongoose');

const mongoPurchaseSchema = new mongoose.Schema({
  orderId: String,
  deliveredAt: String
});

module.exports = new mongoose.model('Purchase', mongoPurchaseSchema);
