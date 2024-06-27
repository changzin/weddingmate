const express = require('express');
const {myBoxCategory,myBoxItemName,myBoxItemOption } = require('../controller/myBoxController')
const {loginCheck} = require('../middleware/login');
const router = express.Router();

//견적함 내 카테고리
router.get('/mybox',loginCheck,myBoxCategory);
//견적함 내  상품이름
router.get('/mybox/name',loginCheck,myBoxItemName);
//견적함 내 상품옵션
router.get('/mybox/option',loginCheck,myBoxItemOption);



module.exports = router;