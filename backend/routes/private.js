const express = require('express');
const { getPrivateDate } = require('../controller/private');
const router = express.Router();
const { protect } = require('../middleware/auth');

router.route('/profile').get(protect, getPrivateDate);

module.exports = router;
