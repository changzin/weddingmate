const express = require('express');
const {adminQnaList, qnaDetail, itemDetail, wholeItemDetail, getSelectedQnADetail, insertQnA, updateSelectedQnADetail,searchItemDetail, isSelectedQnaVisibility, deleteQnA, deleteAdminQnA} = require('../controller/qnaController');
const {adminLoginCheck, loginCheck, loginFilter} = require('../middleware/login');
const {upload, uploadUpdate, uploadDelete} = require('../middleware/imageHandler');

const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.get('/adminlist', adminQnaList);
router.post('/admindetail', adminLoginCheck, qnaDetail);
router.get('/itemdetail/:item_id', itemDetail);
router.get('/wholeitemdetail/:item_id' ,wholeItemDetail);
router.post('/getselectedqnadetail', loginFilter, getSelectedQnADetail); 
router.post('/insertqna', loginCheck, upload, insertQnA); 
router.post('/updateselectedqnadetail',loginCheck, uploadUpdate, updateSelectedQnADetail); 
router.post('/searchitemdetail/:item_id', searchItemDetail);
router.post('/isselectedqnavisibility', loginFilter, isSelectedQnaVisibility); 
router.post('/deleteqna', loginCheck, uploadDelete, deleteQnA); 
router.post('/deleteAdminqna', adminLoginCheck, uploadDelete, deleteAdminQnA); 

module.exports = router;