const express = require('express');
const path = require('path');
const studentController = require('../controllers/student');
const loginController = require('../controllers/prijava');

const router = express.Router();

router.get('/', loginController.login);

router.get('/:username', loginController.passwordWarning);

router.post('/create', studentController.addStudent);

module.exports = router;