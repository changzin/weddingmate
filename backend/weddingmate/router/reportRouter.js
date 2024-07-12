const express = require('express');
const { loginCheck, adminLoginCheck } = require('../middleware/login');
const { addReport, reportList } = require('../controller/reportController');
const router = express.Router();

router.post("/add", loginCheck, addReport);
router.post("/list", adminLoginCheck, reportList);


module.exports = router;