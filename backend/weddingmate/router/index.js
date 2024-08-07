const express = require('express');
const userRouter = require('./userRouter');
const reviewRouter = require('./reviewRouter');
const qnaRouter = require('./qnaRouter');
const orderRouter = require('./orderRouter');
const answerRouter = require('./answerRouter');
const productRouter = require('./productRouter');
const scheduleRouter = require('./scheduleRouter');
const reportRouter = require('./reportRouter');
const imageRouter = require('./imageRouter');
const mainRouter = require('./mainRouter');
const mypageRouter = require('./mypageRouter');
const myboxRouter = require('./myboxRouter');
const router = express.Router();

// 여러 라우터 파일을 모아서 묶어주는 역할을 수행
router.use("/user", userRouter);
router.use("/", mainRouter);
router.use("/review", reviewRouter);
router.use("/qna", qnaRouter);
router.use("/order",orderRouter);
router.use("/answer", answerRouter);

router.use("/product", productRouter);
router.use("/schedule", scheduleRouter);
router.use("/report", reportRouter);
router.use("/image", imageRouter);
router.use('/mypage', mypageRouter);
router.use('/mybox', myboxRouter);

module.exports = router;
