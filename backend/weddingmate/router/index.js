const express = require('express');
const userRouter = require('./userRouter');

const router = express.Router();

// 여러 라우터 파일을 모아서 묶어주는 역할을 수행
router.use("/user", userRouter);



module.exports = router;