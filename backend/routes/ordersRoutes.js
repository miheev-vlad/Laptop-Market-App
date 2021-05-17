const express = require('express');
const router = express.Router();
const { create } = require('../controller/ordersControllers');
const { protect } = require('../middleware/auth');

router.route('/create').post(protect, create);

module.exports = router;