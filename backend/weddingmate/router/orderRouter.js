const express = require('express');
const {orderData} = require('../controller/orderController')
const router = express.Router();

router.post('/orderData',orderData);

module.exports = router;