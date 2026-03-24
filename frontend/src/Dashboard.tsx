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
import axios from "axios";




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
import { useState, useEffect } from "react";

const backendurl = import.meta.env.VITE_BACKEND_URL as string | unknown

type UserStats = {
  totalUsers: number;
  activeUsers: number;
  inactiveUsers: number;
  type: string;
};

type UserStats1 = {
  totalUsers: number;
  presentUsers: number;
  absentUsers: number;
  insideUsers: number;
  outsideUsers: number;
  type: string;
};



const token = localStorage.getItem('lebhai')


function Dashboard() {

  const [department, setDepartment] = useState<[]>()
  const [totaldepartment, setTotaldepartment] = useState<number | null>(null)


  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [userStats1, setUserStats1] = useState<UserStats1 | null>(null);

  const fetchEmployee = async () => {
    const fetchEmployeeresult = await axios.get(`${backendurl}/api/Dashboard/BioStar_Dep_EmpCount`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

    setTotaldepartment(fetchEmployeeresult.data.totalDepartments)
    setDepartment(fetchEmployeeresult.data?.data)

  }

  const fetchStatusEmployee = async () => {
    const fetchEmployeestatus = await axios.get(`${backendurl}/api/Dashboard/User-Counts-BioStar`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

    setUserStats(fetchEmployeestatus.data)
    console.log('le maderchod', fetchEmployeestatus)

  }
   const fetchStatusEmployee1 = async () => {
    const fetchEmployeestatus1 = await axios.get(`${backendurl}/api/Dashboard/Dashboard-count`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })

    setUserStats1(fetchEmployeestatus1.data)
    console.log('le maderchod2', fetchEmployeestatus1)

  }

  useEffect(() => {
    fetchEmployee();
    fetchStatusEmployee()
    fetchStatusEmployee1()
  }, [])


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
            <a href="/users" className="sidebar-item">
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
            <a href="/Report" className="sidebar-item">
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


          

             {/* Active/Inactive Users - Donut Chart */}
            <div className="dashboard-card donut-card">
              <div className="card-header">
                <h3 className="card-title">User Status</h3>
                <button className="report-btn">Report</button>
              </div>
              <div className="donut-container">
                <svg viewBox="0 0 200 200" className="donut-svg">
                  <circle cx="100" cy="100" r="70" fill="none" stroke="#f3f4f6" strokeWidth="20" />
                  {(() => {
                    const total = userStats?.totalUsers || 1;
                    const active = userStats?.activeUsers || 0;
                    const inactive = userStats?.inactiveUsers || 0;
                    const circumference = 2 * Math.PI * 70;
                    const activeArc = (active / total) * circumference;
                    const inactiveArc = (inactive / total) * circumference;
                    let offset = 0;
                    return (
                      <>
                        <circle cx="100" cy="100" r="70" fill="none" stroke="#10b981" strokeWidth="20"
                          strokeDasharray={`${activeArc} ${circumference}`}
                          strokeDashoffset={-offset}
                          transform="rotate(-90 100 100)" />
                        <circle cx="100" cy="100" r="70" fill="none" stroke="#ef4444" strokeWidth="20"
                          strokeDasharray={`${inactiveArc} ${circumference}`}
                          strokeDashoffset={-(offset += activeArc)}
                          transform="rotate(-90 100 100)" />
                      </>
                    );
                  })()}
                  <text x="100" y="95" textAnchor="middle" className="donut-total">
                    {userStats?.totalUsers || 0}
                  </text>
                  <text x="100" y="110" textAnchor="middle" className="donut-label">Total</text>
                </svg>
                <div className="donut-legend">
                  <div className="legend-row">
                    <span className="legend-dot green"></span>
                    <span className="legend-text">Active</span>
                    <span className="legend-percent">{userStats?.totalUsers ? Math.round((userStats.activeUsers / userStats.totalUsers) * 100) : 0}%</span>
                    <span className="legend-value">{userStats?.activeUsers || 0}</span>
                  </div>
                  <div className="legend-row">
                    <span className="legend-dot red"></span>
                    <span className="legend-text">Inactive</span>
                    <span className="legend-percent">{userStats?.totalUsers ? Math.round((userStats.inactiveUsers / userStats.totalUsers) * 100) : 0}%</span>
                    <span className="legend-value">{userStats?.inactiveUsers || 0}</span>
                  </div>
                  <div className="legend-row">
                    <span className="legend-dot blue"></span>
                    <span className="legend-text">Total</span>
                    <span className="legend-percent">100%</span>
                    <span className="legend-value">{userStats?.totalUsers || 0}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Department Users - Donut Chart */}
            <div className="dashboard-card donut-card">
              <div className="card-header">
                <h3 className="card-title">User Status</h3>
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
                  {(() => {
                    const total = userStats1?.totalUsers || 1;
                    const present = userStats1?.presentUsers || 0;
                    const absent = userStats1?.absentUsers || 0;
                    const inside = userStats1?.insideUsers || 0;
                    const outside = userStats1?.outsideUsers || 0;
                    
                    const circumference = 2 * Math.PI * 70;
                    const presentArc = (present / total) * circumference;
                    const absentArc = (absent / total) * circumference;
                    const insideArc = (inside / total) * circumference;
                    const outsideArc = (outside / total) * circumference;
                    
                    let offset = 0;
                    
                    return (
                      <>
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="none"
                          stroke="#10b981"
                          strokeWidth="20"
                          strokeDasharray={`${presentArc} ${circumference}`}
                          strokeDashoffset={-offset}
                          transform="rotate(-90 100 100)"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="none"
                          stroke="#ef4444"
                          strokeWidth="20"
                          strokeDasharray={`${absentArc} ${circumference}`}
                          strokeDashoffset={-(offset += presentArc)}
                          transform="rotate(-90 100 100)"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="none"
                          stroke="#3b82f6"
                          strokeWidth="20"
                          strokeDasharray={`${insideArc} ${circumference}`}
                          strokeDashoffset={-(offset += absentArc)}
                          transform="rotate(-90 100 100)"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r="70"
                          fill="none"
                          stroke="#f59e0b"
                          strokeWidth="20"
                          strokeDasharray={`${outsideArc} ${circumference}`}
                          strokeDashoffset={-(offset += insideArc)}
                          transform="rotate(-90 100 100)"
                        />
                      </>
                    );
                  })()}
                  <text
                    x="100"
                    y="95"
                    textAnchor="middle"
                    className="donut-total"
                  >
                    {userStats1?.totalUsers || 0}
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
                    <span className="legend-dot green"></span>
                    <span className="legend-text">Present</span>
                    <span className="legend-percent">{userStats1?.totalUsers ? Math.round((userStats1.presentUsers / userStats1.totalUsers) * 100) : 0}%</span>
                    <span className="legend-value">{userStats1?.presentUsers || 0}</span>
                  </div>
                  <div className="legend-row">
                    <span className="legend-dot red"></span>
                    <span className="legend-text">Absent</span>
                    <span className="legend-percent">{userStats1?.totalUsers ? Math.round((userStats1.absentUsers / userStats1.totalUsers) * 100) : 0}%</span>
                    <span className="legend-value">{userStats1?.absentUsers || 0}</span>
                  </div>
                  <div className="legend-row">
                    <span className="legend-dot blue"></span>
                    <span className="legend-text">Inside</span>
                    <span className="legend-percent">{userStats1?.totalUsers ? Math.round((userStats1.insideUsers / userStats1.totalUsers) * 100) : 0}%</span>
                    <span className="legend-value">{userStats1?.insideUsers || 0}</span>
                  </div>
                  <div className="legend-row">
                    <span className="legend-dot amber"></span>
                    <span className="legend-text">Outside</span>
                    <span className="legend-percent">{userStats1?.totalUsers ? Math.round((userStats1.outsideUsers / userStats1.totalUsers) * 100) : 0}%</span>
                    <span className="legend-value">{userStats1?.outsideUsers || 0}</span>
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
                  {department?.slice(0, 3).map((dept: any, index: number) => {
                    const radii = [80, 65, 50];
                    const colors = ['#3b82f6', '#10b981', '#f59e0b'];
                    const totalEmployees = department.reduce((sum: number, d: any) => sum + d.employeeCount, 0);
                    const circumference = 2 * Math.PI * radii[index];
                    const percentage = (dept.employeeCount / totalEmployees) * 100;
                    const dashArray = `${(percentage / 100) * circumference} ${circumference}`;

                    return (
                      <g key={index}>
                        <circle
                          cx="100"
                          cy="100"
                          r={radii[index]}
                          fill="none"
                          stroke="#f3f4f6"
                          strokeWidth="12"
                        />
                        <circle
                          cx="100"
                          cy="100"
                          r={radii[index]}
                          fill="none"
                          stroke={colors[index]}
                          strokeWidth="12"
                          strokeDasharray={dashArray}
                          strokeDashoffset="0"
                          transform="rotate(-90 100 100)"
                        />
                      </g>
                    );
                  })}
                  <text
                    x="100"
                    y="95"
                    textAnchor="middle"
                    className="donut-total"
                  >
                    {totaldepartment}
                  </text>
                  <text
                    x="100"
                    y="110"
                    textAnchor="middle"
                    className="donut-label"
                  >
                    Departments
                  </text>
                </svg>
                <div className="multilayer-legend">
                  {department?.slice(0, 5).map((dept: any, index: number) => {
                    const colors = ['blue', 'green', 'amber', 'purple', 'teal', 'orange', 'red', 'pink', 'indigo', 'cyan', 'lime', 'emerald', 'violet', 'gray'];
                    return (
                      <div key={index} className="legend-row">
                        <span className={`legend-dot ${colors[index % colors.length]}`}></span>
                        <span className="legend-text">{dept.department}</span>
                        <span className="legend-value">{dept.employeeCount}</span>
                      </div>
                    );
                  })}
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

export default Dashboard;
