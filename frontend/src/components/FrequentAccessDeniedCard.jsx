import React, { useState, useEffect } from 'react';
import api from '../api';

const FrequentAccessDeniedCard = () => {

  const [frequendAccessDeniedData, setFrequentAccessDeniedData] = useState([]);

  const fetchFrequentAccessDeniedData = async () => {
    try {
      const result = await api.get('/api/Dashboard/EventWiseCountToday');
      setFrequentAccessDeniedData(result.data.data ?? []);
      // console.log('✅ Frequent Access Denied data fetched:', result.data.data);
    } catch (err) {
      console.error('❌ Frequent Access Denied fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchFrequentAccessDeniedData();
  }, []);

  // For demonstration, using static data. Replace with API data when available.


  const sampleData = [
    { eventCode: '6401', eventName: 'ACCESS_DENIED_ACCESS_GROUP', count: 0 },
    { eventCode: '6402', eventName: 'ACCESS_DENIED_DISABLED', count: 0 },
    { eventCode: '6403', eventName: 'ACCESS_DENIED_EXPIRED', count: 0 },
   ]

   const totalAttempts = frequendAccessDeniedData.reduce((accumulator, currentvalue) => accumulator + currentvalue.count, 0);

  const accessDeniedData1 = [
    { name: 'Alex Johnson', count: 12, percentage: 80 },
    { name: 'Maria Garcia', count: 9, percentage: 60 },
    { name: 'David Chen', count: 6, percentage: 40 }
  ];

  return (
    <div className="dashboard-card frequent-access-denied-card">
      <div className="card-header-enhanced">
        <div className="header-left">
          <div className="card-icon-enhanced">🚫</div>
          <div className="title-section">
            <h3 className="card-title-enhanced">Frequent Access Denied</h3>
            <p className="card-subtitle">Security Violation Tracking</p>
          </div>
        </div>
        <div className="export-badge">📊</div>
      </div>

      <div className="frequent-access-denied-content">
        <div className="denied-users-list">
          {frequendAccessDeniedData.slice(0,3).map((user, i) => (
            <div key={i} className="denied-user-item">
              <div className="user-info">
                <div className="user-avatar">
                  {user.eventCode.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="user-details">
                  <span className="user-name">{user.eventName.substring(0, 15)}...</span>
                  <span className="attempt-count">{user.count} attempts</span>
                </div>
              </div>
              <div className="denied-progress">
                <div className="progress-bar-denied">
                  <div
                    className="progress-fill-denied"
                    style={{ width: `${user.eventName}%` }}
                  ></div>
                </div>
                <span className="denied-count">{user.count}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="access-denied-summary">
          <div className="summary-grid">
            <div className="summary-item total-attempts">
              <div className="summary-icon">⚠️</div>
              <div className="summary-info">
                <span className="summary-value">{totalAttempts}</span>
                <span className="summary-label">Total Attempts</span>
              </div>
            </div>

            {/* <div className="summary-item affected-users">
              <div className="summary-icon">👥</div>
              <div className="summary-info">
                <span className="summary-value">3</span>
                <span className="summary-label">Affected Users</span>
              </div>
            </div> */}
          </div>

          <div className="security-alert">
            <div className="alert-indicator">
              <div className="alert-pulse"></div>
              <span className="alert-text">Security Review Required</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrequentAccessDeniedCard;