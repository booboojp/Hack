import React, { useState, useEffect } from 'react';

const getTeacherData = async (name) => {
  const response = await fetch(`http://localhost:3001/pullreport/teacher/${name}`);
  const data = await response.json();
  return data;
}

const getStudentData = async (name) => {
  const response = await fetch(`http://localhost:3001/pullreport/student/${name}`);
  const data = await response.json();
  return data;
}

function View() {
  const [teacherData, setTeacherData] = useState(null);
  const [studentData, setStudentData] = useState(null);
  const [teacherName, setTeacherName] = useState('');
  const [studentName, setStudentName] = useState('');
  const [averageRating, setAverageRating] = useState(0);
  function cleanString(input) {
    var output = "";
    for (var i=0; i<input.length; i++) {
      if (input.charCodeAt(i) <= 127) {
        output += input.charAt(i);
      }
    }
    return output;
  }
  const fetchTeacherData = async () => {
    const data = await getTeacherData(teacherName);
    setTeacherData(data);
  
    // Calculate the average rating
    let totalRating = 0;
    let count = 0;
    data.forEach((teacher) => {
      try {
        // Clean the rating string and parse it to an object
        const cleanRating = cleanString(teacher.rating);
        const rating = JSON.parse(cleanRating);
        console.log(rating)
        
        totalRating += parseFloat(rating.negative);
        totalRating += parseFloat(rating.neutral);
        totalRating += parseFloat(rating.positive);
        count += 3;
      } catch (error) {
        console.error('Error parsing rating:', error);
      }
    });
    const averageRating = totalRating / count;
    setAverageRating(averageRating);
  }

  const fetchStudentData = async () => {
    const data = await getStudentData(studentName);
    setStudentData(data);
  }

  return (
    <div>
      <h1>Find Teacher</h1>
      <input type="text" value={teacherName} onChange={e => setTeacherName(e.target.value)} />
      <p>Average Rating: {JSON.stringify(averageRating, null, 2)}</p>
      {teacherData ? teacherData.map((data, index) => (
        <div key={index}>
          <p>ID: {data._id}</p>
          <p>Text: {data.text}</p>
          <p>Selection: {data.selection}</p>
          <p>Teacher Name: {data.teacherNameText}</p>
          <p>Description: {data.teacherDescriptionText}</p>
          <p>Said: {data.teacherSaidText}</p>
          <p>Rating: {data.rating}</p>
          <br></br>

        </div>
      )) : <p>Click the button to fetch teacher data</p>}
      <button onClick={fetchTeacherData}>Fetch Teacher Data</button>

      <h1>Find Student</h1>
      <input type="text" value={studentName} onChange={e => setStudentName(e.target.value)} />
      {studentData ? studentData.map((data, index) => (
        <div key={index}>
          <p>ID: {data._id}</p>
          <p>Text: {data.text}</p>
          <p>Selection: {data.selection}</p>
          <p>Teacher Name: {data.studentNameText}</p>
          <p>Description: {data.studentDescriptionText}</p>
          <p>Said: {data.studentSaidText}</p>
          <p>Rating: {data.rating}</p>
          <br></br>

        </div>
      )) : <p>Click the button to fetch teacher data</p>}
      <button onClick={fetchStudentData}>Fetch Teacher Data</button>
    </div>
  );
}

export default View;