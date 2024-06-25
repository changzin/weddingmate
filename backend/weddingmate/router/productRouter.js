const express = require('express');
const {productList, productDetail, BoxList, AddBox} = require('../controller/productController');
const { adminLoginCheck, loginCheck } = require('../middleware/login');


const router = express.Router();

router.get('/list/:itemDetailType', productList);


router.get('/detail/:itemId', productDetail);

router.post('/boxlist',loginCheck, BoxList);

router.post('/addbox',loginCheck, AddBox);

module.exports = router;