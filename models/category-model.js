const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: String,
  class: String
});

module.exports = new mongoose.model('Category', categorySchema);
