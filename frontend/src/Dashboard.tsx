import LadyEmpLateExitCard from "./components/LadyEmpLateExitCard";
import EmpLateExitCard from "./components/EmpLateExitCard";
import DifferentlyAbledCard from "./components/DifferentlyAbledCard";
import LateInEarlyOutCard from "./components/LateInEarlyOutCard";
import AlertsFrequentlyInOutCard from "./components/AlertsFrequentlyInOutCard";
import FrequentAccessDeniedCard from "./components/FrequentAccessDeniedCard";
import OddHoursSwipeCard from "./components/OddHoursSwipeCard";


import Header from "./components/Header";


import UserStatusChart from "./components/UserStatusChart";
import DepartmentUsersChart from "./components/DepartmentUsersChart";
import DepartmentListChart from "./components/DepartmentListChart";
import api from "./api";
import "./App.css";
import { useState, useEffect } from "react"; 

// const backendurl = import.meta.env.VITE_BACKEND_URL as string | unknown
// const token = localStorage.getItem('lebhai')

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

type Department = {
  department: string;
  employeeCount: number;
};






function Dashboard() {

  const [department, setDepartment] = useState<Department[]>([])  // Initialize with empty array instead of undefined
  const [totaldepartment, setTotaldepartment] = useState<number | null>(null)


  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [userStats1, setUserStats1] = useState<UserStats1 | null>(null);

  const fetchEmployee = async () => {
    const fetchEmployeeresult = await api.get('/api/Dashboard/BioStar_Dep_EmpCount');

    setTotaldepartment(fetchEmployeeresult.data.totalDepartments)
    setDepartment(fetchEmployeeresult.data?.data)

  }

  const fetchStatusEmployee = async () => {
    const fetchEmployeestatus = await api.get('/api/Dashboard/User-Counts-BioStar');

    setUserStats(fetchEmployeestatus.data)
    // console.log('le data', fetchEmployeestatus)
    // console.log('active  user', userStats?.activeUsers)

  }
  const fetchStatusEmployee1 = async () => {
    const fetchEmployeestatus1 = await api.get('/api/Dashboard/Dashboard-count');

    setUserStats1(fetchEmployeestatus1.data)
    // console.log('le maderchod2', fetchEmployeestatus1)

  }

  useEffect(() => {
    fetchEmployee();
    fetchStatusEmployee()
    fetchStatusEmployee1()
  }, [])




  return (
    <div className="app">
      <Header currentPage="dashboard">
        <div className="content-header">
          <h1 className="content-title">Attendance & Access Management</h1>
          <div className="organization-name">Enterprise Dashboard</div>
        </div>
        {/* <div>
           
        </div> */}

        <div className="dashboard-grid">

          {/* Active/Inactive Users - Donut Chart */}
          <div className="dashboard-card donut-card">
            <div className="card-header">
              <h3 className="card-title">User Status</h3>
              <button className="report-btn">Report</button>
            </div>
            <div className="donut-container">
              <UserStatusChart userStats={userStats} />
              {/* <div className="donut-legend">
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
              </div> */}
            </div>
          </div>

          {/* Department Users - Donut Chart */}
          <div className="dashboard-card donut-card">
            <div className="card-header">
              <h3 className="card-title">User Status</h3>
              <button className="report-btn">Report</button>
            </div>
            <div className="donut-container">
              <DepartmentUsersChart userStats1={userStats1} />

{/*               
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
              </div> */}
            </div>
          </div>

          {/* Department List - Multilayer Donut */}
          <div className="dashboard-card department-list-card">
            <div className="card-header">
              <h3 className="card-title">Department - No of Users</h3>
            </div>
            <div className="multilayer-donut">
              <DepartmentListChart department={department} totaldepartment={totaldepartment} />


              {/* <div className="multilayer-legend">
                {department?.slice(0, 5).map((dept: any, index: number) => {
                  const colors = ['blue', 'green', 'amber', 'red', 'purple'];
                  return (
                    <div key={index} className="legend-row">
                      <span className={`legend-dot ${colors[index % colors.length]}`}></span>
                      <span className="legend-text">{dept.department}</span>
                      <span className="legend-value">{dept.employeeCount}</span>
                    </div>
                  );
                })}
              </div> */}
            </div>
          </div>
          


        </div>

        <div className="dashboard-grid1">







          <AlertsFrequentlyInOutCard />
          {/* Odd Hours Swipe Card */}
          <OddHoursSwipeCard />

          {/* Emp Late Exit */}

          <EmpLateExitCard activeUsers={userStats?.activeUsers ?? 0} />

          <LateInEarlyOutCard />

          <FrequentAccessDeniedCard />

          <LadyEmpLateExitCard />

          <DifferentlyAbledCard />
        </div>
        {/* <EmployeeDashboard /> */}
      </Header>
    </div>

  );
}

export default Dashboard;
