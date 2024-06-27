const express = require('express');
const {adminReviewList, adminReviewDelete, itemDetail, userReviewDelete, reviewReport} = require('../controller/reviewController');
const { adminLoginCheck, loginCheck } = require('../middleware/login');

const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.get('/adminlist', adminReviewList);
router.post('/admindelete', adminLoginCheck,adminReviewDelete);
router.post('/delete', loginCheck ,userReviewDelete);
router.get('/itemdetail/:item_id', itemDetail);
router.post('/reviewreport',loginCheck, reviewReport);
module.exports = router;