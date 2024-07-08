const express = require('express');
const {bookmarkList, bookmarkDeleteC, bookmarkDel, paymentList, reviewList, reviewDel, qnaList, boxList, boxAdd,receiptList} = require('../controller/mypageController');
const {loginCheck} = require('../middleware/login');
const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.post('/bookmarklist', loginCheck, bookmarkList);
router.post('/bookmarklist/delchekced', bookmarkDeleteC);
router.post('/bookmarklist/del', bookmarkDel);
router.post('/payment', loginCheck, paymentList);
router.post('/review', loginCheck, reviewList);
router.post('/review/del', reviewDel);
router.post('/qnalist',loginCheck, qnaList);
router.post('/boxlist',loginCheck, boxList);
router.post('/boxlist/add',loginCheck, boxAdd);
//건용 추가 
router.post('/payment/recepit',loginCheck,receiptList)

module.exports = router;