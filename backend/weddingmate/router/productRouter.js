const express = require('express');
const {productList, productDetail} = require('../controller/productController');


const router = express.Router();

router.get('/list/:itemDetailType', productList);


router.get('/detail/:itemId', productDetail);

module.exports = router;