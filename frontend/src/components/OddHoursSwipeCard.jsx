import React, { useState, useEffect } from 'react';
import api from '../api';
import './EmployeeDashboard.css';

const OddHoursSwipeCard = () => {
  const [data, setData] = useState(null);

  const fetchOddHours = async () => {
    try {
      const result = await api.get('/api/Dashboard/PunchSummaryToday');
      //  console.log('✅ OddHours raw response:', result.data);
      setData(result.data);
    } catch (err) {
      console.error('❌ OddHours fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchOddHours();
  }, []);

  const total = data?.totalPunchCount || 0;
  const pct = (val) => total > 0 ? Math.round((val / total) * 100) : 0;

  return (
    <div className="chart-card odd-hours-card">

      <div className="card-header-enhanced">
        <div className="header-left">
          <div className="card-icon-enhanced">🌙</div>
          <div className="title-section">
            <h3 className="card-title-enhanced">Odd Hrs In/Out Swipe</h3>
            <p className="card-subtitle">Daily Performance Analytics</p>
          </div>
        </div>
        <div className="export-badge">📊</div>
      </div>
      <div className="odd-hours-content">
        <div className="hours-grid">
          <div className="hour-card">
            <div className="hour-header">
              <span className="hour-icon">🌅</span>
              <span className="hour-label">Before 9:00 AM</span>
            </div>
            <div className="hour-value">{data?.firstPunchBefore9 ?? '-'}</div>
            <div className="hour-trend">{pct(data?.firstPunchBefore9)}% of total</div>
          </div>

          {/* <div className="hour-card">
            <div className="hour-header">
              <span className="hour-icon">🕙</span>
              <span className="hour-label">After 9:30 AM</span>
            </div>
            <div className="hour-value">{data?.firstPunchAfter930 ?? '-'}</div>
            <div className="hour-trend">{pct(data?.firstPunchAfter930)}% of total</div>
          </div> */}

          <div className="hour-card">
            <div className="hour-header">
              <span className="hour-icon">🌆</span>
              <span className="hour-label">Last Out After 5:30</span>
            </div>
            <div className="hour-value">{data?.lastPunchAfter530 ?? '-'}</div>
            <div className="hour-trend">{pct(data?.lastPunchAfter530)}% of total</div>
          </div>

          {/* <div className="hour-card">
            <div className="hour-header">
              <span className="hour-icon">🏃</span>
              <span className="hour-label">Last Out Before 5:30</span>
            </div>
            <div className="hour-value">{data?.lastPunchBefore530 ?? '-'}</div>
            <div className="hour-trend">{pct(data?.lastPunchBefore530)}% of total</div>
          </div> */}

          {/* <div className="hour-card">
            <div className="hour-header">
              <span className="hour-icon">👩</span>
              <span className="hour-label">Female Out Before 5:30</span>
            </div>
            <div className="hour-value">{data?.femaleLastPunchBefore530 ?? '-'}</div>
            <div className="hour-trend">{pct(data?.femaleLastPunchBefore530)}% of total</div>
          </div> */}
        </div>

        <div className="odd-hours-swipe-summary">
          <div className="total-swipes">
            <span className="total-label">Total Swipes</span>
            <span className="total-value">{total.toLocaleString()}</span>
          </div>
          <div className="odd-hours-gender-container">
            <span className="odd-hours-gender-text">👨 Male: {data?.maleCount ?? 0}</span>
            <span className="odd-hours-gender-text">👩 Female: {data?.femaleCount ?? 0}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OddHoursSwipeCard;
