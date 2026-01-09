import React from 'react';

const DifferentlyAbledCard = () => {
  return (
    <div className="dashboard-card differently-abled-card">
      <div className="card-header-enhanced">
        <div className="header-left">
          <div className="card-icon-enhanced">♿</div>
          <div className="title-section">
            <h3 className="card-title-enhanced">Differently Abled Employee Tracking</h3>
            <p className="card-subtitle">Accessibility & Inclusion Metrics</p>
          </div>
        </div>
        <div className="export-badge">📊</div>
      </div>
      
      <div className="differently-abled-content">
        <div className="progress-section">
          <svg viewBox="0 0 160 160" className="accessibility-donut-svg">
            <defs>
              <linearGradient id="accessibilityGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="50%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>
            
            <circle cx="80" cy="80" r="65" fill="none" stroke="#f1f5f9" strokeWidth="12" />
            <circle 
              cx="80" cy="80" r="65" 
              fill="none" 
              stroke="url(#accessibilityGradient)" 
              strokeWidth="12"
              strokeDasharray="363 408"
              strokeDashoffset="0"
              transform="rotate(-90 80 80)"
              strokeLinecap="round"
              className="animated-stroke"
            />
            
            <text x="80" y="70" textAnchor="middle" className="donut-main-value">89%</text>
            <text x="80" y="88" textAnchor="middle" className="donut-period">Attendance</text>
            <text x="80" y="102" textAnchor="middle" className="donut-percentage">Rate</text>
          </svg>
        </div>
        
        <div className="accessibility-stats">
          <div className="stat-grid">
            <div className="stat-card total">
              <div className="stat-header">
                <span className="stat-icon">👥</span>
                <span className="stat-label">Total Employees</span>
              </div>
              <div className="stat-value">18</div>
            </div>
            
            <div className="stat-card present">
              <div className="stat-header">
                <span className="stat-icon">✅</span>
                <span className="stat-label">Present Today</span>
              </div>
              <div className="stat-value">16</div>
            </div>
            
            <div className="stat-card access">
              <div className="stat-header">
                <span className="stat-icon">🔑</span>
                <span className="stat-label">Special Access Used</span>
              </div>
              <div className="stat-value">24</div>
            </div>
          </div>
          
          <div className="accessibility-summary">
            <div className="summary-item">
              <span className="summary-label">Inclusion Score</span>
              <div className="inclusion-bar">
                <div className="inclusion-fill" style={{ width: '92%' }}></div>
              </div>
              <span className="summary-value">92%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DifferentlyAbledCard;