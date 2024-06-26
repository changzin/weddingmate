const express = require('express');
const { loginCheck } = require('../middleware/login');
const { addReport } = require('../controller/reportController');
const router = express.Router();

router.post("/add", loginCheck, addReport);


module.exports = router;