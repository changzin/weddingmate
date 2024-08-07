const express = require('express');
const {userList, userBlock, userUnblock, adminInfo} = require('../controller/adminController');
const {login, info, signUp, emailVerify, emailIsVerified, edit, modifyPasswordVerifyEmail} = require('../controller/userController');
const { adminLoginCheck, loginCheck } = require('../middleware/login');

const router = express.Router();

// 컨트롤러의 여러 함수들을 Request URI에 맞게 매핑하는 역할 수행
router.get('/list', userList);
router.post('/block', adminLoginCheck, userBlock);
router.post('/unblock', adminLoginCheck, userUnblock);
router.post('/login', login);
router.post('/info', info);
router.post('/signup', signUp);
router.post('/emailverify', emailVerify);
router.post('/emailisverified', emailIsVerified);
router.post('/edit', loginCheck, edit);
router.post('/admininfo', adminInfo);
router.post('/emailreverify', modifyPasswordVerifyEmail);

module.exports = router;