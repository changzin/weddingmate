const express = require('express');
const {orderData, makeOrder, kakaoPay, analysis} = require('../controller/orderController')
const {loginCheck, adminLoginCheck} = require('../middleware/login')
const router = express.Router();

router.post('/orderdata', loginCheck ,orderData);
router.post('/makeorder', loginCheck, makeOrder);
router.post('/kakaopay', loginCheck, kakaoPay);
router.post('/analysis', adminLoginCheck, analysis);
module.exports = router;