const express = require('express');
const { loginCheck } = require('../middleware/login');
const { scheduleList, insertSchedule, deleteSchedule } = require('../controller/scheduleController');

const router = express.Router();

router.post('/list', loginCheck, scheduleList);
router.post('/insertschedule', loginCheck, insertSchedule);
router.post('/deleteschedule', loginCheck, deleteSchedule); 


module.exports = router;