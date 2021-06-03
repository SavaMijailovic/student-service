const mongoose = require('mongoose');
const studentModel = require('./student');

const examSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    student: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Student'
    },
    subject: String,
    date: {
        type: Date,
        default: new Date()
    },
    grade: Number
}, {collection: 'exams'});

const ExamModel = mongoose.model('Exam', examSchema);

async function getExamsForStudent(username) {
    const allExams = await ExamModel.find().populate('student').sort({date: 1}).exec();
    const exams = [];
    for (const exam of allExams) {
        if (exam.student.username === username) {
            exams.push(exam);
        }
    }
    return exams;
}

async function getAllExams() {
    return await ExamModel.find().populate('student', 'username name surname').sort({
        subject: 1,
        grade: -1
    }).exec();
}

async function addExam(data) {
    const studentId = await studentModel.getStudentId(data.username);
    let exam = null;
    if (studentId != null) {
        exam = new ExamModel();
        exam._id = new mongoose.Types.ObjectId();
        exam.student = studentId;
        exam.subject = data.subject;
        exam.grade = Number.parseInt(data.grade);
        exam.date = new Date(data.date);
        await exam.save();
    }
    return exam;
}

async function deleteExams(username, subject) {
    const studentId = await studentModel.getStudentId(username);
    if (studentId != null) {
        await ExamModel.deleteMany({$and: [
            {student: studentId},
            {subject: subject}
            ]
        }).exec();
    }
}

async function updateExamsDate(username) {
    const studentId = await studentModel.getStudentId(username);
    if (studentId != null) {
        await ExamModel.updateMany(
            {student: studentId},
            {$currentDate: {date: true}}
        ).exec();
    }
}

module.exports = {
    getExamsForStudent,
    getAllExams,
    addExam,
    deleteExams,
    updateExamsDate
}