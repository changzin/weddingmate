const express = require('express');
const {orderData, makeOrder} = require('../controller/orderController')
const {loginCheck} = require('../middleware/login')
const router = express.Router();

router.post('/orderdata', loginCheck ,orderData);
router.post('/makeorder', loginCheck, makeOrder);

module.exports = router;