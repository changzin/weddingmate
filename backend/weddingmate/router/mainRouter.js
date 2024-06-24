const express = require('express');
const {mainStudio} = require('../controller/mainpageController')
const router = express.Router();

router.post('/mainstudio',mainStudio);

module.exports = router;