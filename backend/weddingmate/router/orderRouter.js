const express = require('express');
const {orderData, makeOrder} = require('../controller/orderController')
const router = express.Router();

router.post('/orderData',orderData);
router.post('/makeorder',makeOrder);

module.exports = router;