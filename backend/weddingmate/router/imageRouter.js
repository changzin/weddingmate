const express = require('express');
const { download } = require('../controller/imageController');

const router = express.Router();

router.get('/get', download);

module.exports = router;