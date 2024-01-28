import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SecondPage from './pages/View.js'; 
import Home from './pages/Home.js'
import Report from './pages/Report.js'

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/view" element={<SecondPage />} />
          <Route path="/report" element={<Report />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;