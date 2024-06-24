const express = require('express');
const {userList, userBlock, userUnblock} = require('../controller/adminController');
const {login, info, signUp, emailVerify} = require('../controller/userController');
const { adminLoginCheck } = require('../middleware/login');

const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.get('/list', userList);
router.post('/block', adminLoginCheck, userBlock);
router.post('/unblock', adminLoginCheck, userUnblock);
router.post('/login', login);
router.post('/info', info);
router.post('/signup', signUp);
router.post('/emailverify', emailVerify);
module.exports = router;