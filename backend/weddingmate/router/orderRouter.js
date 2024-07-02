const express = require('express');
const {orderData, makeOrder, kakaoPay} = require('../controller/orderController')
const {loginCheck} = require('../middleware/login')
const router = express.Router();

router.post('/orderdata', loginCheck ,orderData);
router.post('/makeorder', loginCheck, makeOrder);
router.post('/kakaopay', loginCheck, kakaoPay);

module.exports = router;