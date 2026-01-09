import React from 'react';

const LadyEmpLateExitCard = () => {
  return (
    <div className="dashboard-card lady-emp-card">
      <div className="card-header-enhanced">
        <div className="header-left">
          <div className="card-icon-enhanced">👩💼</div>
          <div className="title-section">
            <h3 className="card-title-enhanced">Lady Emp Late Exit</h3>
            <p className="card-subtitle">Weekly Performance Tracking</p>
          </div>
        </div>
        <div className="export-badge">📊</div>
      </div>
      
      <div className="lady-emp-content">
        <div className="donut-section">
          <svg viewBox="0 0 160 160" className="lady-donut-svg">
            <defs>
              <linearGradient id="ladyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
            
            <circle cx="80" cy="80" r="65" fill="none" stroke="#f1f5f9" strokeWidth="12" />
            <circle 
              cx="80" cy="80" r="65" 
              fill="none" 
              stroke="url(#ladyGradient)" 
              strokeWidth="12"
              strokeDasharray="265 408"
              strokeDashoffset="0"
              transform="rotate(-90 80 80)"
              strokeLinecap="round"
              className="animated-stroke"
            />
            
            <text x="80" y="70" textAnchor="middle" className="donut-main-value">26</text>
            <text x="80" y="88" textAnchor="middle" className="donut-period">This Week</text>
            <text x="80" y="102" textAnchor="middle" className="donut-percentage">65%</text>
          </svg>
        </div>
        
        <div className="stats-section">
          <div className="trend-card">
            <div className="trend-header">
              <span className="trend-icon decrease">↓</span>
              <span className="trend-value">15%</span>
            </div>
            <p className="trend-label">Decrease from last week</p>
          </div>
          
          <div className="metrics-grid">
            <div className="metric-item">
              <span className="metric-number">18</span>
              <span className="metric-label">Last Week</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">31</span>
              <span className="metric-label">Peak Day</span>
            </div>
            <div className="metric-item">
              <span className="metric-number">4.2</span>
              <span className="metric-label">Avg/Day</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LadyEmpLateExitCard;