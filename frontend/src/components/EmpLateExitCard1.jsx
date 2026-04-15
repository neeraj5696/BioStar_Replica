import React, { useState, useEffect } from 'react';
import api from '../api';

const EmpLateExitCard1 = ({ activeUsers = 0 }) => {
  const [lateExitData, setLateExitData] = useState([]);

  const fetchlateEmployee = async () => {
    try {
      const result = await api.get('/api/Dashboard/LateExitLast6Days');
      // console.log('✅ LateExit raw response:', result.data);
      // console.log('✅ LateExit data array:', result.data?.data);
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
            <h3 className="card-title-enhanced">Occupancy</h3>
            <p className="card-subtitle">Daily Plant wise Occupancy Analytics</p>
          </div>
        </div>
        <div className="export-badge">📊</div>
      </div>

      <div className="emp-late-content">
        <div className="bar-chart-section">
          <div className="bar-grid-enhanced">
            {lateExitData.map((day, i) => {
              const heightPct = Math.round((day.lateExitCount / maxCount) * 100);
              const labels = ['P1', 'P2', 'P3', 'P4', 'P5', 'P6', 'P7'];
              return (
                <div key={i} style={{ marginRight: '30px' }} className="bar-column-enhanced">
                  <div className="bar-wrapper-enhanced">
                    <div className="bar-fill-enhanced" style={{ height: `${heightPct+7}%` }}>
                      <span className="bar-value-enhanced">{day.lateExitCount+6}%</span>
                    </div>
                  </div>
                  <div  className="bar-label-enhanced">
                    {
                      labels[i]
                    }
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
};

export default EmpLateExitCard1;
