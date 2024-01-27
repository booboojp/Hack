const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const UserSchema = require('./reportSchema');
async function connect() {
    await mongoose.connect('mongodb+srv://BrentanRRath:1319@judgement-chan.cbcec0f.mongodb.net/Reports?retryWrites=true&w=majority');
    console.log('Connected to MongoDB');
}
const Report = mongoose.model('User', UserSchema, 'Reports');
async function createReport(text, selection, isChecked, additionalText) {
    const report = new Report({ text: text, selection: selection, isChecked: isChecked, additionalText: additionalText });
    await report.save();
    return report;
}

app.use(cors());

app.use(bodyParser.json());

app.post('/api/endpoint', (req, res) => {
    console.log(req.body);
    connect();
    createReport(req.body.text, req.body.selection, req.body.isChecked, req.body.additionalText); 
  res.status(200).send('Data received');
});
app.listen(3001, () => {
    console.log('Server is running on port 3001');
});



