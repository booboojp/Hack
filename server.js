const express = require('express');
const { spawn } = require('child_process');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const StudentReportSchema = require('./reportStudentSchema');
const TeacherReportSchema = require('./reportTeacherSchema');
async function connect() {
    await mongoose.connect('mongodb+srv://BrentanRRath:1319@judgement-chan.cbcec0f.mongodb.net/Reports?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');
}
const StudentReport = mongoose.model('Student', StudentReportSchema, 'Student Reports');
const TeacherReport = mongoose.model('Teacher', TeacherReportSchema, 'Teacher Reports');
async function createStudentReport(text, selection, studentNameText, studentDescriptionText, studentSaidText, rating) {
    const newStudentReport = new StudentReport({ text: text, selection: selection, studentNameText: studentNameText, studentDescriptionText: studentDescriptionText, studentSaidText: studentSaidText, rating: rating});
    await newStudentReport.save();
    return newStudentReport;
}
async function createTeacherReport(text, selection, teacherNameText, teacherDescriptionText, teacherSaidText, rating) {
    const newTeacherReport = new TeacherReport({ text: text, selection: selection, teacherNameText: teacherNameText, teacherDescriptionText: teacherDescriptionText, teacherSaidText: teacherSaidText, rating: rating});
    await newTeacherReport.save();
    return newTeacherReport;
}

async function readTeacherReport(teachersName) {
    const teacherReports = await TeacherReport.find({ teacherNameText: teachersName });
    return teacherReports;
}

async function readStudentReport(studentsName) {
    const stuentReports = await StudentReport.find({ studentNameText: studentsName });
    return stuentReports;
}






app.use(cors());

app.use(bodyParser.json());

app.post('/getreport/student/endpoint', (req, res) => {
    console.log(req.body);
    const pretext = req.body.text;
    try {
        console.log('Trying to spawn python process');
        const process = spawn('python', ['functions/aiModel.py', pretext]);
        let dataString = '';
        process.stdout.on('data', (data) => {
            dataString += data.toString();
        });
        process.stdout.on('end', () => {
            console.log(dataString);
            connect();
            createStudentReport(req.body.text, req.body.selection, req.body.studentNameText, req.body.studentDescription, req.body.studentSaidText, dataString); 
        });
    } catch (error) {
        console.log(error);
    }
    res.status(200).send('Data received');
});



app.post('/getreport/teacher/endpoint', (req, res) => {
    console.log(req.body);
    const pretext = req.body.text;
    try {
        console.log('Trying to spawn python process');
        const process = spawn('python', ['functions/aiModel.py', pretext]);
        let dataString = '';
        process.stdout.on('data', (data) => {
            dataString += data.toString();
        });
        process.stdout.on('end', () => {
            console.log(dataString);
            connect();
            try {
                console.log(req.body.teacherNameText, req.body.teacherDescription, req.body.teacherSaidText);
            } catch (error) {
                console.log(error);
            }
            createTeacherReport(req.body.text, req.body.selection, req.body.teacherNameText, req.body.teacherDescription, req.body.teacherSaidText, dataString); 
        });
    } catch (error) {
        console.log(error);
    }
    res.status(200).send('Data received');
});






app.get('/pullreport/teacher/:name', async (req, res) => {
    const name = req.params.name.replace(/_/g, ' ');

    try {
        console.log('Trying to connect to MongoDB');
        await connect();
        console.log('Connected to MongoDB')
        console.log('Trying to read teacher report')
        const report = await readTeacherReport(name);
        console.log('Read teacher report');
        if (report) {
            res.status(200).json(report);
        } else {
            res.status(404).send('No report found for this teacher');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while fetching data');
    }
});


app.get('/pullreport/student/:name', async (req, res) => {
    const name = req.params.name.replace(/_/g, ' ');

    try {
        console.log('Trying to connect to MongoDB');
        await connect();
        console.log('Connected to MongoDB')
        console.log('Trying to read student report')
        const report = await readStudentReport(name);
        console.log('Read student report');
        if (report) {   
            res.status(200).json(report);
        } else {
            res.status(404).send('No report found for this teacher');
        }
    } catch (err) {
        console.log(err);
        res.status(500).send('Error occurred while fetching data');
    }
});





app.listen(3001, () => {
    console.log('Server is running on port 3001');
});



