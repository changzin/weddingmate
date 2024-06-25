const express = require('express');
const {productList, productDetail, BoxList} = require('../controller/productController');
const { adminLoginCheck, loginCheck } = require('../middleware/login');


const router = express.Router();

router.get('/list/:itemDetailType', productList);


router.get('/detail/:itemId', productDetail);

router.get('/boxlist',loginCheck, BoxList);

module.exports = router;