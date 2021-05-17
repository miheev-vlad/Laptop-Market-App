const Product = require("../models/Product")

exports.getPaginProducts = async (req, res) => {
  try {
    let query = Product.find();
    const page = parseInt(req.query.page) || 1;
    const pageSize = parseInt(req.query.limit) || 8;
    const skip = (page - 1) * pageSize;
    const total = await Product.countDocuments();
    const pages = Math.ceil(total / pageSize);
    query = query.skip(skip).limit(pageSize);
    if (page > pages) {
      return res.status(404).json({
        status: 'fail',
        message: 'No page found',
      })
    }
    const result = await query;
    res.status(200).json({
      status: 'success',
      count: result.length,
      page,
      pages,
      products: result
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: 'error',
      message: 'Server Error',
    })
  }
}