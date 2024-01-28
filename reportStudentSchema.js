const mongoose = require('mongoose');

const StudentReportSchema = new mongoose.Schema({
    text: { type: String, default: 'null' },
    selection: { type: String, default: 'null' },
    studentNameText: { type: String, default: 'null' },
    studentDescriptionText: { type: String, default: 'null' },
    studentSaidText: { type: String, default: 'null' },
    rating: { type: mongoose.Schema.Types.Mixed, default: {} },
});
module.exports = StudentReportSchema