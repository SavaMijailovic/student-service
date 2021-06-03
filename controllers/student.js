const studentModel = require('../models/student');

async function getStudentByUsername(req, res, next) {
    try {
        const student = await studentModel.getStudentByUsername(req.body.username);

        if (student == null) {
            throw new Error('@Ne postoji nalog za uneto korisničko ime');
        }
        else if (!studentModel.doPasswordMatch(student, req.body.password)) {
            return res.redirect('/prijava/' + req.body.username);
        } 
        else {
            res.render('student.ejs', { student: student });
        }
    } catch (err) {
        next(err);
    }
}


async function updateStudentData(req, res, next) {
    try {
        await studentModel.updateStudentData(req.body);
        next();
    } catch (err) {
        next(err);
    }
}

async function deleteStudent(req, res, next) {
    try {
        const username = req.params.username;
        await studentModel.deleteStudent(username);
        res.redirect('/prijava');
    } catch (err) {
        next(err);
    }
}

async function addStudent(req, res, next) {
    try {
        const exists = null != await studentModel.getStudentByUsername(req.body.username);
        if (!exists) {
            await studentModel.addStudent(req.body.username, req.body.password);
        }
        res.send({ exists: exists });
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getStudentByUsername,
    updateStudentData,
    deleteStudent,
    addStudent
}