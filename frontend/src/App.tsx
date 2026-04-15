import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './pages/Login';
import Reports from './pages/Reports';
import Firstinlastout_device from './pages/Firstinlastout_device';
import Cafeteria_report from './pages/Cafeteria_report';
import Missing_punch_report from './pages/Missing_punch_report';
import Shiftwise_report from './pages/Shiftwise_report';
import Enrolled_Employee from './pages/Enrolled_employees';
import Access_groups from './pages/Access_groups';
import Tracking_emp_report from './pages/Tracking_emp_report';
import Breakhrs_report from './pages/Breakhrs_report';
import Doors from './pages/Doors';
import UserManagement from './pages/UserManagement';
import UserSettings from './pages/UserSettings';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/firstinlastout" element={<Firstinlastout_device />} />
        <Route path="/reports/cafeteria" element={<Cafeteria_report />} />
        <Route path="/reports/missing_punches" element={<Missing_punch_report />} />
        <Route path="/reports/shiftwise" element={<Shiftwise_report />} />
        <Route path="/reports/tracking-emp-report" element={<Tracking_emp_report />} />
        <Route path="/reports/breakhours" element={<Breakhrs_report />} />

        //get request
        <Route path="/reports/enrolled_employees" element={<Enrolled_Employee/>} />
        <Route path="/reports/access_groups" element={<Access_groups />} />
        <Route path="/reports/doors" element={<Doors />} />
        <Route path="/reports/management" element={<UserManagement />} />
        <Route path="/reports/settings" element={<UserSettings />} />

      </Routes>
    </Router>
  );
};

export default App