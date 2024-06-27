const express = require('express');
const {addAnswer, updateAnswer, getAnswer} = require('../controller/answerController');
const {adminLoginCheck} = require('../middleware/login');

const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.post('/add', adminLoginCheck, addAnswer);
router.post('/update', adminLoginCheck, updateAnswer);

router.post('/getanswer', getAnswer);

module.exports = router;