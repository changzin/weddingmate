const express = require('express');
const userRouter = require('./userRouter');
const reviewRouter = require('./reviewRouter');
const qnaRouter = require('./qnaRouter');

const router = express.Router();

// 여러 라우터 파일을 모아서 묶어주는 역할을 수행
router.use("/user", userRouter);
router.use("/review", reviewRouter);
router.use("/qna", qnaRouter);


module.exports = router;