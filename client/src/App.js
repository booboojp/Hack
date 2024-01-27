import React, { useState } from 'react';
import './App.css';

function App() {
  const [isChecked, setIsChecked] = useState(false);
  const [text, setText] = useState('');
  const [selection, setSelection] = useState('');
  const [additionalText, setAdditionalText] = useState('');

  const handleSubmit = async () => {
    const data = {
      text: text,
      selection: selection,
      isChecked: isChecked,
      additionalText: isChecked ? additionalText : null
    };
  
    const response = await fetch('http://localhost:3001/api/endpoint', {
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
        <input 
          type="text" 
          placeholder="Enter text here" 
          value={text} 
          onChange={e => setText(e.target.value)} 
        />
      </div>
      <div className="form-element">
        <select value={selection} onChange={element => setSelection(element.target.value)}>
          <option value="">Select...</option>
          <option value="student">Student</option>
          <option value="teacher">Teacher</option>
          <option value="assignment">Assignment</option>
        </select>
      </div>
      <div className="form-element">
        <input 
          type="checkbox" 
          checked={isChecked} 
          onChange={() => setIsChecked(!isChecked)} 
        />
      </div>
      {isChecked && (
        <div className="form-element">
          <input 
            type="text" 
            placeholder="Additional text box" 
            value={additionalText} 
            onChange={element => setAdditionalText(element.target.value)} 
          />
        </div>
      )}
      <div className="form-element">
        <button type="submit" onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default App;