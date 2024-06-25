const express = require('express');
const { loginCheck } = require('../middleware/login');
const { scheduleList } = require('../controller/scheduleController');

const router = express.Router();

router.post('/list', loginCheck, scheduleList);
module.exports = router;