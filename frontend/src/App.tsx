import {
  EmployeeDashboardHeader,
  EmployeeDashboard,
} from "./components/EmployeeDashboard";
import LadyEmpLateExitCard from "./components/LadyEmpLateExitCard";
import EmpLateExitCard from "./components/EmpLateExitCard";
import DifferentlyAbledCard from "./components/DifferentlyAbledCard";
import LateInEarlyOutCard from "./components/LateInEarlyOutCard";
import AlertsFrequentlyInOutCard from "./components/AlertsFrequentlyInOutCard";
import FrequentAccessDeniedCard from "./components/FrequentAccessDeniedCard";
import SwipeDataCard from "./components/SwipeDataCard";
import OddHoursSwipeCard from "./components/OddHoursSwipeCard";

import {
  Settings,
  Cable,
  Info,
  HelpCircle,
  LogOut,
  User,
  BarChart3,
  Users,
  Smartphone,
  DoorOpen,
  Building2,
  MapPin,
  Shield,
  Eye,
  Clock,
  FileText,
} from "lucide-react";
import "./App.css";

function App() {
  const lateExitData = [
    { day: "Mon", count: 14, percentage: 73 },
    { day: "Tue", count: 17, percentage: 89 },
    { day: "Wed", count: 12, percentage: 63 },
    { day: "Thu", count: 18, percentage: 95 },
    { day: "Fri", count: 19, percentage: 100 },
  ];

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div className="header-left">
          <div className="logo-container">
            <div className="logo-icon">🔬</div>
            <h1 className="logo">BioStar 2</h1>
          </div>
          <nav className="header-nav">
            <a href="#" className="nav-link">
              <Settings size={18} className="nav-icon" />
              <span>Settings</span>
            </a>
            <a href="#" className="nav-link">
              <Cable size={18} className="nav-icon" />
              <span>Port</span>
            </a>
            <a href="#" className="nav-link">
              <Info size={18} className="nav-icon" />
              <span>About</span>
            </a>
            <a href="#" className="nav-link">
              <HelpCircle size={18} className="nav-icon" />
              <span>Help</span>
            </a>
          </nav>
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-avatar">
              <User size={20} />
            </div>
            <div className="user-details">
              <div className="user-name">Niraj Kumar Yadav</div>
              <div className="user-role">Administrator</div>
            </div>
            <button className="logout-btn">
              <LogOut size={18} />
            </button>
          </div>
        </div>
      </header>

      <div className="main-container">
        {/* Sidebar */}
        <aside className="sidebar">
          <nav className="sidebar-nav">
            <a href="#" className="sidebar-item active">
              <BarChart3 size={20} className="sidebar-icon" />
              <span>DASHBOARD</span>
            </a>
            <a href="#" className="sidebar-item">
              <Users size={20} className="sidebar-icon" />
              <span>USER</span>
            </a>
            <a href="#" className="sidebar-item">
              <Smartphone size={20} className="sidebar-icon" />
              <span>DEVICE</span>
            </a>
            <a href="#" className="sidebar-item">
              <DoorOpen size={20} className="sidebar-icon" />
              <span>DOOR</span>
            </a>
            <a href="#" className="sidebar-item">
              <Building2 size={20} className="sidebar-icon" />
              <span>ELEVATOR</span>
            </a>
            <a href="#" className="sidebar-item">
              <MapPin size={20} className="sidebar-icon" />
              <span>ZONE</span>
            </a>
            <a href="#" className="sidebar-item">
              <Shield size={20} className="sidebar-icon" />
              <span>ACCESS CONTROL</span>
            </a>
            <a href="#" className="sidebar-item">
              <Eye size={20} className="sidebar-icon" />
              <span>MONITORING</span>
            </a>
            <a href="#" className="sidebar-item">
              <Clock size={20} className="sidebar-icon" />
              <span>TIME ATTENDANCE</span>
            </a>
            <a href="#" className="sidebar-item">
              <FileText size={20} className="sidebar-icon" />
              <span>REPORT</span>
            </a>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="content">
          <div className="content-header">
            <h1 className="content-title">Attendance & Access Management</h1>
            <div className="organization-name">Enterprise Dashboard</div>
          </div>
          {/* <div>
           
        </div> */}

        <div>
         
          <div className="employee-dashboard-header">
             <EmployeeDashboardHeader />
          </div>
        </div>

          <div className="dashboard-grid">
            {/* Device & User Status Overview - Analytics Card */}
            <div className="analytics-card">
              <h3 className="analytics-title">Device & User Status Overview</h3>
              <div className="analytics-rows">
                <div className="analytics-row">
                  <span className="row-label">Connected Devices</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill blue"
                      style={{ width: "85%" }}
                    ></div>
                  </div>
                  <span className="row-value">247</span>
                </div>
                <div className="analytics-row">
                  <span className="row-label">Disconnected Devices</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill orange"
                      style={{ width: "12%" }}
                    ></div>
                  </div>
                  <span className="row-value">8</span>
                </div>
                <div className="analytics-row">
                  <span className="row-label">Departments / No of Users</span>
                  <div className="progress-bar">
                    <div
                      className="progress-fill green"
                      style={{ width: "92%" }}
                    ></div>
                  </div>
                  <span className="row-value">658</span>
                </div>
              </div>
            </div>

            {/* Department Users - Donut Chart */}
            <div className="dashboard-card donut-card">
              <div className="card-header">
                <h3 className="card-title">Sessions by Device</h3>
                <button className="report-btn">Report</button>
              </div>
              <div className="donut-container">
                <svg viewBox="0 0 200 200" className="donut-svg">
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="20"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#8b5cf6"
                    strokeWidth="20"
                    strokeDasharray="220 440"
                    strokeDashoffset="0"
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#f97316"
                    strokeWidth="20"
                    strokeDasharray="110 440"
                    strokeDashoffset="-220"
                    transform="rotate(-90 100 100)"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="70"
                    fill="none"
                    stroke="#14b8a6"
                    strokeWidth="20"
                    strokeDasharray="110 440"
                    strokeDashoffset="-330"
                    transform="rotate(-90 100 100)"
                  />
                  <text
                    x="100"
                    y="95"
                    textAnchor="middle"
                    className="donut-total"
                  >
                    2,847
                  </text>
                  <text
                    x="100"
                    y="110"
                    textAnchor="middle"
                    className="donut-label"
                  >
                    Total
                  </text>
                </svg>
                <div className="donut-legend">
                  <div className="legend-row">
                    <span className="legend-dot purple"></span>
                    <span className="legend-text">Desktop</span>
                    <span className="legend-percent">50%</span>
                    <span className="legend-value">1,424</span>
                  </div>
                  <div className="legend-row">
                    <span className="legend-dot orange"></span>
                    <span className="legend-text">Mobile</span>
                    <span className="legend-percent">25%</span>
                    <span className="legend-value">712</span>
                  </div>
                  <div className="legend-row">
                    <span className="legend-dot teal"></span>
                    <span className="legend-text">Tablet</span>
                    <span className="legend-percent">25%</span>
                    <span className="legend-value">711</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Department List - Multilayer Donut */}
            <div className="dashboard-card department-list-card">
              <div className="card-header">
                <h3 className="card-title">Department - No of Users</h3>
              </div>
              <div className="multilayer-donut">
                <svg viewBox="0 0 200 200" className="multilayer-svg">
                  {/* Outer ring - IT */}
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="12"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="80"
                    fill="none"
                    stroke="#3b82f6"
                    strokeWidth="12"
                    strokeDasharray="125 377"
                    strokeDashoffset="0"
                    transform="rotate(-90 100 100)"
                  />

                  {/* Middle ring - Sales */}
                  <circle
                    cx="100"
                    cy="100"
                    r="65"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="12"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="65"
                    fill="none"
                    stroke="#10b981"
                    strokeWidth="12"
                    strokeDasharray="162 408"
                    strokeDashoffset="0"
                    transform="rotate(-90 100 100)"
                  />

                  {/* Inner ring - Operations */}
                  <circle
                    cx="100"
                    cy="100"
                    r="50"
                    fill="none"
                    stroke="#f3f4f6"
                    strokeWidth="12"
                  />
                  <circle
                    cx="100"
                    cy="100"
                    r="50"
                    fill="none"
                    stroke="#f59e0b"
                    strokeWidth="12"
                    strokeDasharray="107 314"
                    strokeDashoffset="0"
                    transform="rotate(-90 100 100)"
                  />

                  <text
                    x="100"
                    y="95"
                    textAnchor="middle"
                    className="donut-total"
                  >
                    658
                  </text>
                  <text
                    x="100"
                    y="110"
                    textAnchor="middle"
                    className="donut-label"
                  >
                    Total Users
                  </text>
                </svg>
                <div className="multilayer-legend">
                  <div className="legend-row">
                    <span className="legend-dot blue"></span>
                    <span className="legend-text">IT Department</span>
                    <span className="legend-value">156</span>
                  </div>
                  <div className="legend-row">
                    <span className="legend-dot green"></span>
                    <span className="legend-text">Sales & Marketing</span>
                    <span className="legend-value">203</span>
                  </div>
                  <div className="legend-row">
                    <span className="legend-dot amber"></span>
                    <span className="legend-text">Operations</span>
                    <span className="legend-value">134</span>
                  </div>
                  <div className="legend-row">
                    <span className="legend-dot gray"></span>
                    <span className="legend-text">Others</span>
                    <span className="legend-value">165</span>
                  </div>
                </div>
              </div>
            </div>

            <AlertsFrequentlyInOutCard />
            {/* Odd Hours Swipe Card */}
            <OddHoursSwipeCard />

            {/* Odd Hours In/Out Swipe */}
            <div className="dashboard-card night-card">
              <div className="card-header">
                <div className="card-icon night-icon">🌙</div>
                <h3 className="card-title">Odd Hrs In/Out Swipe</h3>
              </div>
              <div className="night-stats">
                <div className="stat-item">
                  <span className="stat-label">Before 8 AM</span>
                  <span className="stat-value">23</span>
                </div>
                <div className="stat-item">
                  <span className="stat-label">After 8 PM</span>
                  <span className="stat-value">45</span>
                </div>
              </div>
              <div className="area-chart">
                <svg viewBox="0 0 200 60" className="night-chart">
                  <defs>
                    <linearGradient
                      id="nightGradient"
                      x1="0%"
                      y1="0%"
                      x2="0%"
                      y2="100%"
                    >
                      <stop offset="0%" stopColor="#6366f1" stopOpacity="0.8" />
                      <stop
                        offset="100%"
                        stopColor="#6366f1"
                        stopOpacity="0.1"
                      />
                    </linearGradient>
                  </defs>
                  <path
                    d="M0,50 Q50,20 100,30 T200,25 L200,60 L0,60 Z"
                    fill="url(#nightGradient)"
                  />
                </svg>
              </div>
            </div>

            {/* Swipe Data Card */}
            <SwipeDataCard />

            {/* Emp Late Exit */}

            <EmpLateExitCard lateExitData={lateExitData} />

            <LateInEarlyOutCard />

            <FrequentAccessDeniedCard />

            <LadyEmpLateExitCard />

            <DifferentlyAbledCard />
          </div>
          <EmployeeDashboard />
        </main>
      </div>
    </div>
  );
}

export default App;
