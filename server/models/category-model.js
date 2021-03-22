const mongoose = require('mongoose');

const mongoCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  audience: {
    type: String,
    required: true
  }
});

module.exports = new mongoose.model('Category', mongoCategorySchema);
