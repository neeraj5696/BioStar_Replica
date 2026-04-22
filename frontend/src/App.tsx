import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './pages/Login';
import Firstinlastout from './pages/Reports/Firstinlastout';
import Firstinlastout_device from './pages/Reports/Firstinlastout_device';
import Cafeteria_report from './pages/Reports/Cafeteria_report';
import Missing_punch_report from './pages/Reports/Missing_punch_report';
import Breakhrs_report from './pages/Reports/Breakhrs_report';
import Time_profile_door_access from './pages/Reports/Time_profile_door_access';

import Enrolled_Employee from './pages/Reports/Enrolled_employees';
import Access_groups from './pages/Access_groups';
import Tracking_emp_report from './pages/Reports/Tracking_emp_report';

import Doors from './pages/Doors';
import UserManagement from './pages/UserManagement';
import UserSettings from './pages/UserSettings';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/reports" element={<Firstinlastout />} />   {/* FIRST IN LAST OUR REPORT */}
        <Route path="/reports/firstinlastout" element={<Firstinlastout_device />} />
        <Route path="/reports/cafeteria" element={<Cafeteria_report />} />
        <Route path="/reports/missing_punches" element={<Missing_punch_report />} />
        <Route path="/reports/time-profile-door-access" element={<Time_profile_door_access />} />
      
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