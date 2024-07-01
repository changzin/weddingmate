const express = require('express');
const {bookmarkList, bookmarkDeleteC, bookmarkDel} = require('../controller/mypageController');
const {loginCheck} = require('../middleware/login');
const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.post('/bookmarklist', loginCheck, bookmarkList);
router.post('/bookmarklist/delchekced', bookmarkDeleteC);
router.post('/bookmarklist/del', bookmarkDel);


module.exports = router;