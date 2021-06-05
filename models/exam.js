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
    grade: {
        type: Number,
        default: 5
    }
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
    const student = await studentModel.getStudentByUsername(data.username);
    let exam = null;
    if (student != null) {
        exam = new ExamModel({
            _id: new mongoose.Types.ObjectId(),
            student: student._id,
            subject: data.subject,
            grade: data.grade,
            date: new Date(data.date)
        });
        exam = await exam.save();
        await studentModel.updateAvgGrade(student);
    }
    return exam;
}

async function deleteExams(username, subject) {
    const student = await studentModel.getStudentByUsername(username);
    if (student != null) {
        await ExamModel.deleteMany({$and: [
            {student: student._id},
            {subject: subject}
            ]
        }).exec();
        await studentModel.updateAvgGrade(student);
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