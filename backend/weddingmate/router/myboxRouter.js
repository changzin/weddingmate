const express = require('express');
const {myBoxCategory,myBoxItemName,myBoxItemOption } = require('../controller/myBoxController')
const {loginCheck} = require('../middleware/login');
const router = express.Router();

//견적함 내 카테고리

router.post('/',loginCheck, myBoxCategory);


router.get('/category',myBoxCategory);
//견적함 내  상품이름
router.get('/name',loginCheck,myBoxItemName);
//견적함 내 상품옵션
router.get('/option',loginCheck,myBoxItemOption);



module.exports = router;