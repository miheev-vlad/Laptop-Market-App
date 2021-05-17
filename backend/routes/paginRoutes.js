const express = require('express');
const paginControllers = require('../controller/paginControllers');
const router = express.Router();

router.route('/').get(paginControllers.getPaginProducts);

module.exports = router;