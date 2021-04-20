const mongoose = require('mongoose');

const mongoReviewSchema = new mongoose.Schema({
  userId: String,
  productId: String,
  reviewBody: String,
  score: String,
  createdAt: String
});

module.exports = new mongoose.model('Review', mongoReviewSchema);
