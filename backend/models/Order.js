const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  cartItems: {
    type: Object,
    required: true
  },
  orderAddress: {
    type: Object,
    required: true
  },
  user: {
    type: Object,
    required: true
  },
  paidStatus: {
    type: Boolean,
    required: true
  },
  paidSumm: {
    type: Number,
    required: true
  }
});

const Order = mongoose.model('order', orderSchema);

module.exports = Order;