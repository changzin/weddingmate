const express = require('express');
const {productList, productDetail, BoxList, AddBox, InsertItemIntoBox, Bookmark, totalProductDetail} = require('../controller/productController');
const { adminLoginCheck, loginCheck, loginFilter } = require('../middleware/login');
const {addProduct, updateProduct, deleteProduct} = require('../controller/adminController')
const {upload, uploadUpdate, uploadDelete} = require('../middleware/imageHandler');

const router = express.Router();

router.get('/list/:itemDetailType', productList);


router.get('/detail/:itemId', productDetail);

router.post('/boxlist',loginCheck, BoxList);

router.post('/addbox',loginCheck, AddBox);

router.post('/insertitemintobox',loginCheck, InsertItemIntoBox);

router.post('/add', adminLoginCheck, upload, addProduct);

router.post('/update', adminLoginCheck, uploadUpdate, updateProduct);

router.post('/delete', adminLoginCheck, uploadDelete, deleteProduct);

router.post('/bookmark',loginCheck, Bookmark);


router.post('/totalproductdetail/:itemId', loginFilter, totalProductDetail);

module.exports = router;