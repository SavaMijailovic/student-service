const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    username: {
        type: mongoose.Schema.Types.String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: String,
    surname: String,
    major: String,
    avg_grade: {
        type: Number,
        default: 0
    },
    note: {
        type: String,
        required: true, 
        default: ' '
    }
}, {collection: 'students'});

const StudentModel = mongoose.model('Student', studentSchema);

async function avgGrade(student) {
    const examModel = require('./exam');
    const exams = await examModel.getExamsForStudent(student.username);
    if (exams.length > 0) {
        let n = 0;
        let avg = 0;
        for (const exam of exams) {
            avg += exam.grade;
            n++;
        }
        avg /= n;
        student.avg_grade = avg;
        await StudentModel.updateOne({username: student.username}, {$set: {avg_grade: avg}}).exec();
    }
    return student;
}

async function getStudentByUsername(username) {
    const students = await StudentModel.find({username: username}).exec();
    if (students.length > 0) {
        return await avgGrade(students[0]);
    }
    return null;
}

async function getStudentId(username) {
    const student = await getStudentByUsername(username);
    if (student != null) {
        return student._id;
    }
    return null;
}

async function getStudentById(id) {
    return await StudentModel.findById(id).exec();
}

function doPasswordMatch(student, password) {
    return student != null && student.password == password;
}

async function updateStudentData(data) {
    const dataToUpdate = {
        password: data.password,
        name: data.name,
        surname: data.surname,
        major: data.major
    };
    await StudentModel.updateOne({username: data.username}, {$set: dataToUpdate}).exec();
}

async function deleteStudent(username) {
    await StudentModel.deleteOne({username: username}).exec();
}

async function addStudent(username, password) {
    const student = new StudentModel();
    student._id = new mongoose.Types.ObjectId();
    student.username = username;
    student.password = password;
    return await student.save();
}

module.exports = {
    getStudentByUsername,
    getStudentById,
    doPasswordMatch,
    updateStudentData,
    deleteStudent,
    addStudent,
    getStudentId
};

