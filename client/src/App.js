import React, { useState } from 'react';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [selection, setSelection] = useState('');
  const [studentNameText, setstudentNameText] = useState('');
  const [studentDescriptionText, setstudentDescriptionText] = useState('');
  const [studentSaidText, setstudentSaidText] = useState('');
  const [teacherNameText, setteacherNameText] = useState('');
  const [teacherDescriptionText, setteacherDescriptionText] = useState('');
  const [teacherSaidText, setteacherSaidText] = useState('');
  

  const handleStudentSubmit = async () => {
    const data = {
      text: text,
      selection: selection,
      studentNameText: selection === 'student' ? studentNameText : null,
      studentDescription: selection === 'student' ? studentDescriptionText : null,
      studentSaidText: selection === 'student' ? studentSaidText : null,
    };
  
    const response = await fetch('http://localhost:3001/getreport/student/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    if (response.ok) {
      console.log('Data sent successfully');
    } else {
      console.log('Error sending data');
    }
  };
  const handleTeacherSubmit = async () => {
    const data = {
      text: text,
      selection: selection,
      teacherNameText: selection === 'teacher' ? teacherNameText : null,
      teacherDescription: selection === 'teacher' ? teacherDescriptionText : null,
      teacherSaidText: selection === 'teacher' ? teacherSaidText : null,
    };
  
    const response = await fetch('http://localhost:3001/getreport/teacher/endpoint', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
  
    if (response.ok) {
      console.log('Data sent successfully');
    } else {
      console.log('Error sending data');
    }
  };

  return (
    <div className="App">
      <div className="form-element">
        <p><b>What Happened?</b></p>
        <input
          type="text" 
          placeholder="Enter Story here" 
          value={text} 
          onChange={e => setText(e.target.value)} 
        />
      </div>
      <div className="form-element">
      <p><b>Who?</b></p>
        <select value={selection} onChange={e => setSelection(e.target.value)}>
          <option value="">Select...</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
        </select>
        {selection === 'student' ? (
          <>
            <p>Student Name:</p>
            <input value={studentNameText} onChange={e => setstudentNameText(e.target.value)} />
            <p>Student Description:</p>
            <input value={studentDescriptionText} onChange={e => setstudentDescriptionText(e.target.value)} />
            <p>Student Comment:</p>
            <input value={studentSaidText} onChange={e => setstudentSaidText(e.target.value)} />
          </>
        ) : null}
        {selection === 'teacher' ? (
          <>
            <p>Teacher Name:</p>
            <input value={teacherNameText} onChange={e => setteacherNameText(e.target.value)} />
            <p>Teacher Description:</p>
            <input value={teacherDescriptionText} onChange={e => setteacherDescriptionText(e.target.value)} />
            <p>Teacher Comment:</p>
            <input value={teacherSaidText} onChange={e => setteacherSaidText(e.target.value)} />
          </>
        ) : null}
      <div className="form-element">
        {selection === 'student' ? (
          <>
            <button type="submit" onClick={handleStudentSubmit}>Submit</button>
          </>
        ) : null}
        {selection === 'teacher' ? (
          <>
            <button type="submit" onClick={handleTeacherSubmit}>Submit</button>
          </>
        ) : null}
      </div>
    </div>
    </div>
   );

}

export default App;