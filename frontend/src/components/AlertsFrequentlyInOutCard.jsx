import React from 'react';

const AlertsFrequentlyInOutCard = () => {
  const alertsData = [
    { time: '09:15', name: 'John D.', entries: 4, severity: 'high' },
    { time: '11:30', name: 'Sarah M.', entries: 3, severity: 'medium' },
    { time: '14:45', name: 'Mike R.', entries: 2, severity: 'low' }
  ];

  return (
    <div className="dashboard-card alerts-frequent-card">
      <div className="card-header-enhanced">
        <div className="header-left">
          <div className="card-icon-enhanced">🚨</div>
          <div className="title-section">
            <h3 className="card-title-enhanced">Alerts - Frequently In & Out</h3>
            <p className="card-subtitle">Real-time Activity Monitoring</p>
          </div>
        </div>
        <div className="export-badge">📊</div>
      </div>
      
      <div className="alerts-frequent-content">
        <div className="alerts-timeline">
          {alertsData.map((alert, i) => (
            <div key={i} className={`alert-timeline-item ${alert.severity}`}>
              <div className="alert-time-badge">
                <span className="alert-time">{alert.time}</span>
              </div>
              <div className="alert-content">
                <div className="alert-user">
                  <span className="user-name">{alert.name}</span>
                  <span className="entry-count">{alert.entries} entries</span>
                </div>
                <div className={`severity-indicator ${alert.severity}`}>
                  <div className="severity-dot"></div>
                  <span className="severity-text">{alert.severity}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="alerts-summary">
          <div className="summary-stats">
            <div className="stat-item high">
              <div className="stat-icon">🔴</div>
              <div className="stat-info">
                <span className="stat-value">1</span>
                <span className="stat-label">High Priority</span>
              </div>
            </div>
            
            <div className="stat-item medium">
              <div className="stat-icon">🟡</div>
              <div className="stat-info">
                <span className="stat-value">1</span>
                <span className="stat-label">Medium Priority</span>
              </div>
            </div>
            
            <div className="stat-item low">
              <div className="stat-icon">🟢</div>
              <div className="stat-info">
                <span className="stat-value">1</span>
                <span className="stat-label">Low Priority</span>
              </div>
            </div>
          </div>
          
          <div className="total-alerts">
            <span className="total-number">9</span>
            <span className="total-label">Total Entries Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsFrequentlyInOutCard;