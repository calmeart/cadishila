const mongoose = require('mongoose');
const _ = require('lodash');

const mongoCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    lowercase: true,
    get: v => _.capitalize(v)

  },
  audience: {
    type: String,
    required: true,
    lowercase: true,
    get: v => _.capitalize(v),
    enum: [ "human", "pet" ]
  }
});

module.exports = new mongoose.model('Category', mongoCategorySchema);
