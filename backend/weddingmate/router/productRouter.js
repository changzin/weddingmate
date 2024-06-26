const express = require('express');
const {productList, productDetail, BoxList, AddBox, InsertItemIntoBox} = require('../controller/productController');
const { adminLoginCheck, loginCheck } = require('../middleware/login');
const {addProduct} = require('../controller/adminController')

const router = express.Router();

router.get('/list/:itemDetailType', productList);


router.get('/detail/:itemId', productDetail);

router.post('/boxlist',loginCheck, BoxList);

router.post('/addbox',loginCheck, AddBox);

router.post('/insertitemintobox',loginCheck, InsertItemIntoBox);

router.post('/add', adminLoginCheck, addProduct);

module.exports = router;