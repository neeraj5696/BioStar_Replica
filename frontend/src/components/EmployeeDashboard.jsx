import React, { useState } from "react";
import "./EmployeeDashboard.css";

const EmployeeDashboard = () => {
  const [selectedTimeframe, setSelectedTimeframe] = useState("today");

  // Enhanced data structure for modern SaaS dashboard
  const alertsData = [
    {
      time: "09:15",
      name: "John D.",
      entries: 4,
      icon: "🔄",
      severity: "high",
    },
    {
      time: "11:30",
      name: "Sarah M.",
      entries: 3,
      icon: "🔄",
      severity: "medium",
    },
    { time: "14:45", name: "Mike R.", entries: 2, icon: "🕘", severity: "low" },
  ];

  const lateExitData = [
    { day: "Mon", count: 14, percentage: 73 },
    { day: "Tue", count: 17, percentage: 89 },
    { day: "Wed", count: 12, percentage: 63 },
    { day: "Thu", count: 18, percentage: 95 },
    { day: "Fri", count: 19, percentage: 100 },
  ];

  const reportData = [
    { day: "Mon", lateIn: 128, earlyOut: 0, total: 128 },
    { day: "Tue", lateIn: 141, earlyOut: 0, total: 141 },
    { day: "Wed", lateIn: 97, earlyOut: 4, total: 101 },
  ];

  const specialEmployeeData = {
    ladyEmpLateExit: { count: 26, trend: -15, icon: "👩💼", percentage: 78 },
    differentlyAbled: {
      total: 18,
      present: 16,
      specialAccess: 24,
      attendance: 89,
      icon: "♿",
      trend: "+5%",
    },
  };
  const accessDeniedData = [
    { name: "Alex Johnson", count: 12, avatar: "👨💼", status: "critical" },
    { name: "Maria Garcia", count: 9, avatar: "👩💼", status: "warning" },
    { name: "David Chen", count: 6, avatar: "👨💻", status: "normal" },
  ];

  // Hourly activity heatmap data
  const hourlyHeatmap = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    activity: Math.floor(Math.random() * 100) + 1,
    label: `${i.toString().padStart(2, "0")}:00`,
  }));

  // Weekly trend data for area chart
  const weeklyTrend = [
    { day: "Mon", value: 85, label: "Monday" },
    { day: "Tue", value: 92, label: "Tuesday" },
    { day: "Wed", value: 78, label: "Wednesday" },
    { day: "Thu", value: 96, label: "Thursday" },
    { day: "Fri", value: 88, label: "Friday" },
    { day: "Sat", value: 45, label: "Saturday" },
    { day: "Sun", value: 23, label: "Sunday" },
  ];

  const totalEmployees = 658;
  const maxValue = Math.max(...lateExitData.map((d) => d.count));

  return (
    <div className="modern-dashboard">
      {/* Main Content Grid */}
      <div className="content-grid">
        {/* Radial Progress Chart */}
        <div className="chart-card radial-chart">
          <div className="chart-header">
            <h3>Weekly Performance</h3>
            <div className="chart-controls">
              <button className="control-btn active">Week</button>
              <button className="control-btn">Month</button>
            </div>
          </div>
          <div className="radial-container">
            <svg viewBox="0 0 200 200" className="radial-svg">
              <defs>
                <linearGradient
                  id="gradient1"
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="100%"
                >
                  <stop offset="0%" stopColor="#667eea" />
                  <stop offset="100%" stopColor="#764ba2" />
                </linearGradient>
              </defs>
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="#f1f5f9"
                strokeWidth="8"
              />
              <circle
                cx="100"
                cy="100"
                r="80"
                fill="none"
                stroke="url(#gradient1)"
                strokeWidth="8"
                strokeDasharray={`${
                  (specialEmployeeData.differentlyAbled.attendance * 502.65) /
                  100
                } 502.65`}
                strokeDashoffset="0"
                transform="rotate(-90 100 100)"
                strokeLinecap="round"
              />
              <text x="100" y="95" textAnchor="middle" className="radial-value">
                {specialEmployeeData.differentlyAbled.attendance}%
              </text>
              <text
                x="100"
                y="115"
                textAnchor="middle"
                className="radial-label"
              >
                Efficiency
              </text>
            </svg>
            <div className="radial-stats">
              <div className="stat-item">
                <span className="stat-number">
                  {specialEmployeeData.differentlyAbled.present}
                </span>
                <span className="stat-label">Present</span>
              </div>
              <div className="stat-item">
                <span className="stat-number">
                  {specialEmployeeData.differentlyAbled.total}
                </span>
                <span className="stat-label">Total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Area Chart */}
        <div className="chart-card area-chart">
          <div className="chart-header">
            <h3>Weekly Trend Analysis</h3>
            <div className="trend-indicator positive">↗ +12.5%</div>
          </div>
          <div className="area-container">
            <svg viewBox="0 0 300 120" className="area-svg">
              <defs>
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path
                d={`M 0 ${120 - weeklyTrend[0].value} ${weeklyTrend
                  .map((point, i) => `L ${i * 50} ${120 - point.value}`)
                  .join(" ")} L 300 120 L 0 120 Z`}
                fill="url(#areaGradient)"
              />
              <polyline
                points={weeklyTrend
                  .map((point, i) => `${i * 50},${120 - point.value}`)
                  .join(" ")}
                fill="none"
                stroke="#10b981"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {weeklyTrend.map((point, i) => (
                <circle
                  key={i}
                  cx={i * 50}
                  cy={120 - point.value}
                  r="4"
                  fill="#10b981"
                  className="data-point"
                />
              ))}
            </svg>
            <div className="area-labels">
              {weeklyTrend.map((day, i) => (
                <span key={i} className="day-label">
                  {day.day}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Heatmap Visualization */}
        <div className="chart-card heatmap-chart">
          <div className="chart-header">
            <h3>24-Hour Activity Heatmap</h3>
            <div className="heatmap-legend">
              <span>Low</span>
              <div className="legend-gradient"></div>
              <span>High</span>
            </div>
          </div>
          <div className="heatmap-grid">
            {hourlyHeatmap.map((hour, i) => (
              <div
                key={i}
                className="heatmap-cell"
                style={{
                  backgroundColor: `rgba(59, 130, 246, ${hour.activity / 100})`,
                  "--intensity": hour.activity,
                }}
                title={`${hour.label}: ${hour.activity}% activity`}
              >
                <span className="hour-label">{hour.hour}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Vertical Bar Chart */}
        <div className="chart-card bar-chart">
          <div className="chart-header">
            <h3>Emp Late Exit Patterns</h3>
            <button className="export-btn">📊 Export</button>
          </div>
          <div className="bar-container">
            <div className="bar-grid">
              {lateExitData.map((day, i) => (
                <div key={i} className="bar-column">
                  <div className="bar-wrapper">
                    <div
                      className="bar-fill"
                      style={{ height: `${day.percentage}%` }}
                    >
                      <span className="bar-value">{day.count}</span>
                    </div>
                  </div>
                  <span className="bar-label">{day.day}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Alerts List */}
        <div className="chart-card alerts-list">
          <div className="chart-header">
            <h3>🔒 Security Alerts</h3>
            <div className="alert-count">{accessDeniedData.length} Active</div>
          </div>
          <div className="alerts-container">
            {accessDeniedData.map((user, i) => (
              <div key={i} className={`alert-item ${user.status}`}>
                <div className="alert-avatar">{user.avatar}</div>
                <div className="alert-info">
                  <div className="alert-name">{user.name}</div>
                  <div className="alert-details">
                    {user.count} denied attempts
                  </div>
                </div>
                <div className={`alert-status ${user.status}`}>
                  <div className="status-dot"></div>
                  {user.status}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Live Activity Feed */}
        <div className="chart-card activity-feed">
          <div className="chart-header">
            <h3>⚡ Live Activity</h3>
            <div className="live-indicator">
              <div className="pulse-dot"></div>
              Live
            </div>
          </div>
          <div className="feed-container">
            {alertsData.map((alert, i) => (
              <div key={i} className={`feed-item ${alert.severity}`}>
                <div className="feed-time">{alert.time}</div>
                <div className="feed-content">
                  <div className="feed-icon">{alert.icon}</div>
                  <div className="feed-text">
                    <strong>{alert.name}</strong> - {alert.entries} entries
                    detected
                  </div>
                </div>
                <div className={`severity-badge ${alert.severity}`}>
                  {alert.severity}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const EmployeeDashboardHeader = () => {
  // Modern KPI metrics with enhanced data
  const specialEmployeeData = {
    ladyEmpLateExit: { count: 26, trend: -15, icon: "👩💼", percentage: 78 },
    differentlyAbled: {
      total: 18,
      present: 16,
      specialAccess: 24,
      attendance: 89,
      icon: "♿",
      trend: "+5%",
    },
  };
   const accessDeniedData = [
    { name: "Alex Johnson", count: 12, avatar: "👨💼", status: "critical" },
    { name: "Maria Garcia", count: 9, avatar: "👩💼", status: "warning" },
    { name: "David Chen", count: 6, avatar: "👨💻", status: "normal" },
  ];
  const kpiMetrics = [
    {
      title: "Real-time Sessions",
      value: 247,
      change: "+12",
      changeType: "increase",
      icon: "⚡",
      color: "blue",
      subtitle: "Active now",
    },
    {
      title: "Security Alerts",
      value: accessDeniedData.reduce((sum, user) => sum + user.count, 0),
      change: "+8",
      changeType: "increase",
      icon: "🛡️",
      color: "red",
      subtitle: "Access denied today",
    },
    {
      title: "Efficiency Score",
      value: `${specialEmployeeData.differentlyAbled.attendance}%`,
      change: "+2.3%",
      changeType: "increase",
      icon: "📈",
      color: "green",
      subtitle: "Overall performance",
    },
    {
      title: "Peak Hours Load",
      value: "94%",
      change: "-3%",
      changeType: "decrease",
      icon: "🕐",
      color: "orange",
      subtitle: "System capacity",
    },
  ];
 
  return (
    <div className="modern-dashboard">
      {/* KPI Grid - Modern Cards */}
      <div className="kpi-grid">
        {kpiMetrics.map((kpi, index) => (
          <div key={index} className={`kpi-card kpi-${kpi.color}`}>
            <div className="kpi-header">
              <div className="kpi-icon">{kpi.icon}</div>
              <div className={`kpi-change ${kpi.changeType}`}>
                <span className="change-value">{kpi.change}</span>
                <svg className="change-arrow" viewBox="0 0 12 12">
                  <path
                    d={
                      kpi.changeType === "increase"
                        ? "M6 2l4 4H8v4H4V6H2l4-4z"
                        : "M6 10L2 6h2V2h4v4h2l-4 4z"
                    }
                  />
                </svg>
              </div>
            </div>
            <div className="kpi-content">
              <div className="kpi-value">{kpi.value}</div>
              <div className="kpi-title">{kpi.title}</div>
              <div className="kpi-subtitle">{kpi.subtitle}</div>
            </div>
            {/* <div className="kpi-sparkline">
              <svg viewBox="0 0 100 20">
                <polyline
                  points="0,15 20,12 40,8 60,10 80,6 100,4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
            </div> */}
          </div>
        ))}
      </div>
    </div>
  );
};

export { EmployeeDashboard, EmployeeDashboardHeader };
