import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Report from './pages/Report';
import Login from './pages/Login';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
           <Route path="/" element={<Login />} />
        <Route path="/Dashboard" element={<Dashboard />} />
      
        <Route path="/Report" element={<Report />} />
      </Routes>
    </Router>
  );
};

export default App