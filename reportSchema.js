const mongoose = require('mongoose');

const StudentReportSchema = new mongoose.Schema({
    text: { type: String, default: 'null' },
    selection: { type: String, default: 'null' },
    studentNameText: { type: String, default: 'null' },
    studentDescriptionText: { type: String, default: 'null' },
    studentSaidText: { type: String, default: 'null' },
});
const TeacherReportSchema = new mongoose.Schema({
    text: { type: String, default: 'null' },
    selection: { type: String, default: 'null' },
    teacherNameText: { type: String, default: 'null' },
    teacherDescriptionText: { type: String, default: 'null' },
    teacherSaidText: { type: String, default: 'null' },
});
module.exports = StudentReportSchema, TeacherReportSchema