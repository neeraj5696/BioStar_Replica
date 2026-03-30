import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'

import Login from './pages/Login';
import Users from './pages/Users';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
           <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />

      
      
      </Routes>
    </Router>
  );
};

export default App