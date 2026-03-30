import React, { useState, useEffect } from 'react';
import api from '../api';

// severity based on totalCount: >=10 high, >=5 medium, else low
const getSeverity = (total) => total >= 7 ? 'high' : total >= 4 ? 'medium' : 'low';

const AlertsFrequentlyInOutCard = () => {
  const [alertsData, setAlertsData] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      try {
        const result = await api.get('/api/Dashboard/FrequentInOutToday');
        console.log('✅ AlertsFrequentlyInOut:', result.data);
        setAlertsData(result.data.data ?? []);
      } catch (err) {
        console.error('❌ AlertsFrequentlyInOut fetch failed:', err);
      }
    };
    fetch();
  }, []);

  const totalEntries = alertsData.reduce((sum, a) => sum + a.totalCount, 0);
  const high   = alertsData.filter((a) => getSeverity(a.totalCount) === 'high').length;
  const medium = alertsData.filter((a) => getSeverity(a.totalCount) === 'medium').length;
  const low    = alertsData.filter((a) => getSeverity(a.totalCount) === 'low').length;

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
          {alertsData.slice(0,3).map((alert, i) => {
            const severity = getSeverity(alert.totalCount);
            return (
              <div key={i} className={`alert-timeline-item ${severity}`}>
                <div className="alert-time-badge">
                  <span className="alert-time">{alert.timeBucket}</span>
                </div>
                <div className="alert-content">
                  <div className="alert-user">
                    <span className="user-name">{alert.name}</span>
                    <span className="entry-count">
                      ↑{alert.inCount} ↓{alert.outCount} ({alert.totalCount} total)
                    </span>
                  </div>
                  <div className={`severity-indicator ${severity}`}>
                    <div className="severity-dot"></div>
                    <span className="severity-text">{severity}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="alerts-summary">
          <div className="summary-stats">
            <div className="stat-item high">
              <div className="stat-icon">🔴</div>
              <div className="stat-info">
                <span className="stat-value">{high}</span>
                <span className="stat-label">High Priority</span>
              </div>
            </div>
            <div className="stat-item medium">
              <div className="stat-icon">🟡</div>
              <div className="stat-info">
                <span className="stat-value">{medium}</span>
                <span className="stat-label">Medium Priority</span>
              </div>
            </div>
            <div className="stat-item low">
              <div className="stat-icon">🟢</div>
              <div className="stat-info">
                <span className="stat-value">{low}</span>
                <span className="stat-label">Low Priority</span>
              </div>
            </div>
          </div>

          <div className="total-alerts">
            <span className="total-number">{totalEntries}</span>
            <span className="total-label">Total Entries Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsFrequentlyInOutCard;
