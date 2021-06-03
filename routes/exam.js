const express = require('express');
const examController = require('../controllers/exam');

const router = express.Router();

router.post('/', examController.getExamsForStudent);

router.post('/add', examController.addExam, examController.getExamsForStudent)

router.post('/delete', examController.deleteExams, examController.getExamsForStudent);

router.post('/update', examController.updateExamsDate, examController.getExamsForStudent);

module.exports = router;