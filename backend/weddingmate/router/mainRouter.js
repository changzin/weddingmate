const express = require('express');
const {bestItem} = require('../controller/mainpageController')
const router = express.Router();
//메인페이지에 보이는 스튜디오가 하나만 있는게 아니다 
router.get('/bestItem',bestItem);

module.exports = router;