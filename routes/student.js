const express = require('express');
const path = require('path');
const studentController = require('../controllers/student');

const router = express.Router();

router.post('/', studentController.getStudentByUsername);
router.post('/update', studentController.updateStudentData, studentController.getStudentByUsername);
router.post('/delete/:username', studentController.deleteStudent);

module.exports = router;