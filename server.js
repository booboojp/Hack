const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const StudentReportSchema = require('./reportSchema');
const TeacherReportSchema = require('./reportSchema');
async function connect() {
    await mongoose.connect('mongodb+srv://BrentanRRath:1319@judgement-chan.cbcec0f.mongodb.net/Reports?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');
}
const StudentReport = mongoose.model('User', StudentReportSchema, 'Student Reports');
const TeacherReport = mongoose.model('User', TeacherReportSchema, 'Teacher Reports');
async function createStudentReport(text, selection, studentNameText, studentDescriptionText, studentSaidText) {
    const newStudentReport = new StudentReport({ text: text, selection: selection, studentNameText: studentNameText, studentDescriptionText: studentDescriptionText, studentSaidText: studentSaidText});
    await newStudentReport.save();
    return newStudentReport;
}
async function createTeacherReport(text, selection, teacherNameText, teacherDescriptionText, teacherSaidText) {
    const newTeacherReport = new TeacherReport({ text: text, selection: selection, teacherNameText: teacherNameText, teacherDescriptionText: teacherDescriptionText, teacherSaidText: teacherSaidText});
    await newTeacherReport.save();
    return newTeacherReport;
}

app.use(cors());

app.use(bodyParser.json());

app.post('/getreport/student/endpoint', (req, res) => {
    console.log(req.body);
    connect();
    createStudentReport(req.body.text, req.body.selection, req.body.studentNameText, req.body.studentDescription, req.body.studentSaidText); 
  res.status(200).send('Data received');
});
app.post('/getreport/teacher/endpoint', (req, res) => {
    console.log(req.body);
    connect();
    createTeacherReport(req.body.text, req.body.selection, req.body.isChecked, req.body.additionalText); 
  res.status(200).send('Data received');
});
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});



