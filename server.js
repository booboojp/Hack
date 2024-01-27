const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Enable CORS
app.use(cors());

// Parse JSON bodies for this app. 
app.use(bodyParser.json());

app.post('/api/endpoint', (req, res) => {
  console.log(req.body); // This will log the data received in the request body

  // You can then save the data to your database here

  res.status(200).send('Data received');
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});