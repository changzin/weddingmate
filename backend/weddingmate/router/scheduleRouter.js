const express = require('express');
const { loginCheck } = require('../middleware/login');
const { scheduleList, scheduleAdd } = require('../controller/scheduleController');

const router = express.Router();

// router.post('/list', loginCheck, scheduleList);
// router.post('/add', loginCheck, scheduleAdd);
module.exports = router;