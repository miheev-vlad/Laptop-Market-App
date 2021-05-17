const Product = require('../models/Product.js');

const getSearchProducts = async (req, res) => {
  if (req.body.query) {
    let productPattern = new RegExp((req.body.query), 'i')
    try {
      const product = await Product.find({ model: { $regex: productPattern } }).select("_id model");
      res.json({ product })
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  } else {
    res.json({ product: [] })
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  getSearchProducts,
  getProductById,
};
