const mongoose = require('mongoose');

const mongoOrderSchema = new mongoose.Schema({
  cartContent: Array,
  customerDetails: {
    username: String,
    email:  String,
    phone: String,
  },
  deliveryDetails: {
    city: String,
    neighborhood: String,
    addressOne: String,
    addressTwo: String,
    zipCode: String
  },
  createdAt: String,
  status: String,
  deliveredAt: String
});

module.exports = new mongoose.model('Order', mongoOrderSchema);


// {
//   productDetails: {
//     id: String,
//     name: String,
//     description: String,
//     imageLink: String,
//     size: String,
//     price: String
//   },
//   count: Number
// }
