const express = require('express');
const examController = require('../controllers/exam');

const router = express.Router();

router.post('/', examController.getAllExams);

module.exports = router;