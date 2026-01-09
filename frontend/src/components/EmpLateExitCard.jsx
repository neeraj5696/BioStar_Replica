import React from 'react';

const EmpLateExitCard = ({ lateExitData }) => {
  return (
    <div className="dashboard-card emp-late-exit-card">
      <div className="card-header-enhanced">
        <div className="header-left">
          <div className="card-icon-enhanced">🕘</div>
          <div className="title-section">
            <h3 className="card-title-enhanced">Emp Late Exit</h3>
            <p className="card-subtitle">Daily Performance Analytics</p>
          </div>
        </div>
        <div className="export-badge">📊</div>
      </div>
      
      <div className="emp-late-content">
        <div className="bar-chart-section">
          <div className="bar-grid-enhanced">
            {lateExitData.map((day, i) => (
              <div key={i} className="bar-column-enhanced">
                <div className="bar-wrapper-enhanced">
                  <div 
                    className="bar-fill-enhanced" 
                    style={{ height: `${day.percentage}%` }}
                  >
                    <span className="bar-value-enhanced">{day.count}</span>
                  </div>
                </div>
                <span className="bar-label-enhanced">{day.day}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="stats-summary">
          <div className="summary-card">
            <div className="summary-header">
              <span className="summary-icon">📈</span>
              <span className="summary-title">Weekly Total</span>
            </div>
            <div className="summary-value">80</div>
            <div className="summary-trend positive">+8% vs last week</div>
          </div>
          
          <div className="peak-info">
            <div className="peak-day">
              <span className="peak-label">Peak Day</span>
              <span className="peak-value">Friday (19)</span>
            </div>
            <div className="avg-info">
              <span className="avg-label">Daily Avg</span>
              <span className="avg-value">16.0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpLateExitCard;