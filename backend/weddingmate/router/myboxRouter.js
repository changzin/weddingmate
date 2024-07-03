const express = require('express');
const {myBoxCategory,myBoxItemName,myBoxItemDelete } = require('../controller/myBoxController')
const {loginCheck} = require('../middleware/login');
const router = express.Router();

//견적함 내 카테고리
router.post('/',loginCheck, myBoxCategory);
//선택한 아이템에 대해서 정보를 보내줘야한다. 


router.post('/del',myBoxItemDelete);

router.get('/category',myBoxCategory);
//견적함 내  상품이름
router.get('/name',myBoxItemName);
//견적함 내 상품옵션




module.exports = router;