const express = require('express');
const {adminReviewList, adminReviewDelete, itemDetail, userReviewDelete, reviewReport, wholeReview, insertReview,getSelectedReviewDetail, updateSelectedReviewDetail} = require('../controller/reviewController');
const { adminLoginCheck, loginCheck, loginFilter } = require('../middleware/login');
const {upload, uploadUpdate, uploadDelete} = require('../middleware/imageHandler');



const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.get('/adminlist', adminReviewList);
router.post('/admindelete', adminLoginCheck, uploadDelete, adminReviewDelete);
router.post('/delete', loginCheck, uploadDelete, userReviewDelete);
router.post('/itemdetail/:item_id', loginFilter, itemDetail);
router.post('/reviewreport',loginCheck, reviewReport);
router.post('/insertreview', loginCheck, upload, insertReview); 


router.post('/wholereview/:item_id',loginFilter ,wholeReview);
router.post('/getselectedreviewdetail', loginFilter, getSelectedReviewDetail); 
router.post('/updateselectedreviewdetail', loginCheck, uploadUpdate, updateSelectedReviewDetail); 


module.exports = router;