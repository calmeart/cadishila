const mongoose = require('mongoose');
const _ = require('lodash');

const mongoProductSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    get: v => _.startCase(v)
  },
  description: {
    type: String,
    required: true,
    lowercase: true,
    get: v => _.capitalize(v)
  },
  price: {
    type: Number,
    required: true,
    get: v => _.round(v, 2),
    set: v => _.round(v, 2)
  },
  size: {
    type: Array,
    required: true
  },
  categoryId: {
    type: String,
    required: true
  }
});

module.exports = new mongoose.model('Product', mongoProductSchema);
