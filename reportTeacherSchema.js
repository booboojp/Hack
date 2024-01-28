const mongoose = require('mongoose');

const TeacherReportSchema = new mongoose.Schema({
    text: { type: String, default: 'null' },
    selection: { type: String, default: 'null' },
    teacherNameText: { type: String, default: 'null' },
    teacherDescriptionText: { type: String, default: 'null' },
    teacherSaidText: { type: String, default: 'null' },
    rating: { type: mongoose.Schema.Types.Mixed, default: {} },
});
module.exports = TeacherReportSchema