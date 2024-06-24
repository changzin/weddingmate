const express = require('express');
const {adminQnaList, qnaDetail} = require('../controller/qnaController');
const {adminLoginCheck} = require('../middleware/login');

const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.get('/adminlist', adminQnaList);
router.post('/admindetail', adminLoginCheck, qnaDetail);
module.exports = router;