const express = require('express');
const {userList, userBlock, userUnblock} = require('../controller/adminController');
const {login, info} = require('../controller/userController');

const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.get('/list', userList);
router.post('/block', userBlock);
router.post('/unblock', userUnblock);
router.post('/login', login);
router.post('/info', info);
module.exports = router;