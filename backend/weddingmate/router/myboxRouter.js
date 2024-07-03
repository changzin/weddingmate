const express = require('express');
const {myBoxItemName,myBoxItemDelete } = require('../controller/myBoxController')
const {loginCheck} = require('../middleware/login');
const router = express.Router();



router.post('/del',myBoxItemDelete);

// router.get('/category',myBoxCategory);
//견적함 내  상품이름
router.post('/name',loginCheck,myBoxItemName);
//견적함 내 상품옵션




module.exports = router;