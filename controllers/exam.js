const examModel = require('../models/exam');

async function getExamsForStudent(req, res, next) {
    try {
        const exams = await examModel.getExamsForStudent(req.body.username);
        return res.render('exams.ejs', {
            exams: exams,
            student: {
                username: req.body.username,
                password: req.body.password
            }
        });
    } catch (err) {
        next(err);
    }
}

async function getAllExams(req, res, next) {
    try {
        const exams = await examModel.getAllExams();
        return res.render('results.ejs', {
            exams: exams,
            student: {
                username: req.body.username,
                password: req.body.password
            }
        });
    } catch (err) {
        next(err);
    }
}

async function addExam(req, res, next) {
    try {
        await examModel.addExam(req.body);
        next();
    } catch (err) {
        next(err);
    }
}

async function deleteExams(req, res, next) {
    try {
        await examModel.deleteExams(req.body.username, req.body.subject);
        next();
    } catch (err) {
        next(err);
    }
}

async function updateExamsDate(req, res, next) {
    try {
        await examModel.updateExamsDate(req.body.username);
        next();
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getExamsForStudent,
    getAllExams,
    addExam,
    deleteExams,
    updateExamsDate
}