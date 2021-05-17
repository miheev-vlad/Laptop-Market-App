const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  countInStock: {
    type: Number,
    required: true
  },
  images: [{
    type: String,
    required: true
  }],
});

const Product = mongoose.model('product', productSchema);

module.exports = Product;