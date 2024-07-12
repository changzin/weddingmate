const express = require('express');
const {myBoxItemName,myBoxItemDelete,myBoxNameUpdate,myBoxDelete,myBoxOrder } = require('../controller/myBoxController')
const {loginCheck} = require('../middleware/login');
const router = express.Router();


//아이템 삭제
router.post('/del',myBoxItemDelete);
//견적함 이름 수정 
router.post('/update',myBoxNameUpdate)
//행 삭제
router.post('/delectbox',myBoxDelete)

//견적함 내  상품이름
router.post('/name',loginCheck,myBoxItemName);
//상품 주문 ㅇ




module.exports = router;