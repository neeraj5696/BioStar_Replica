import React, { useState, useEffect } from 'react';
import api from '../api';

const EmpLateExitCard = ({ activeUsers = 0 }) => {
  const [lateExitData, setLateExitData] = useState([]);

  const fetchlateEmployee = async () => {
    try {
      const result = await api.get('/api/Dashboard/LateExitLast6Days');
      console.log('✅ LateExit raw response:', result.data);
      console.log('✅ LateExit data array:', result.data?.data);
      setLateExitData(result.data.data ?? []);
    } catch (err) {
      console.error('❌ LateExit fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchlateEmployee();
  }, []);

  const maxCount = Math.max(...lateExitData.map((d) => d.lateExitCount), 1);
  const weeklyTotal = lateExitData.reduce((sum, d) => sum + d.lateExitCount, 0);
  const dailyAvg = lateExitData.length ? (weeklyTotal / lateExitData.length).toFixed(1) : 0;
  const peakDay = lateExitData.reduce((max, d) => (d.lateExitCount > (max?.lateExitCount ?? 0) ? d : max), null);
  // percentage of late exits relative to total active users
  const lateExitPct = activeUsers > 0 ? Math.round((weeklyTotal / (activeUsers * lateExitData.length)) * 100) : 0;

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
            {lateExitData.map((day, i) => {
              const heightPct = Math.round((day.lateExitCount / maxCount) * 100);
              return (
                <div key={i} className="bar-column-enhanced">
                  <div className="bar-wrapper-enhanced">
                    <div className="bar-fill-enhanced" style={{ height: `${heightPct}%` }}>
                      <span className="bar-value-enhanced">{day.lateExitCount}</span>
                    </div>
                  </div>
                  <span className="bar-label-enhanced">
                    {new Date(day.date).toLocaleDateString('en-US', { weekday: 'short' })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="stats-summary">
          <div className="summary-card">
            <div className="summary-header">
              <span className="summary-icon">📈</span>
              <span className="summary-title">Weekly Total</span>
            </div>
            <div className="summary-value">{weeklyTotal}</div>
            <div className="summary-trend">{lateExitPct}% of active users</div>
          </div>

          <div className="peak-info">
            <div className="peak-day">
              <span className="peak-label">Peak Day</span>
              <span className="peak-value">
                {peakDay
                  ? `${new Date(peakDay.date).toLocaleDateString('en-US', { weekday: 'short' })} (${peakDay.lateExitCount})`
                  : '-'}
              </span>
            </div>
            <div className="avg-info">
              <span className="avg-label">Daily Avg</span>
              <span className="avg-value">{dailyAvg}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmpLateExitCard;
