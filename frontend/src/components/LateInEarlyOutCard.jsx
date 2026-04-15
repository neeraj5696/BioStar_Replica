import {useEffect, useState} from 'react';
import axios from "axios";

const backendurl = import.meta.env.VITE_BACKEND_URL 

const token = localStorage.getItem('lebhai')

const LateInEarlyOutCard = () => {


  const [data, setData] = useState(null);

  const fetchOddHours = async () => {
    try {
      const result = await axios.get(`${backendurl}/api/Dashboard/PunchSummaryToday`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      // console.log('✅ qbe:', result.data);
      setData(result.data);
    } catch (err) {
      console.error('❌ OddHours fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchOddHours();
  }, []);




    




  const dualBarData = [
    { day: 'Mon', lateIn: 12, earlyOut: 8 },
    { day: 'Tue', lateIn: 14, earlyOut: 10 },
    { day: 'Wed', lateIn: 9, earlyOut: 7 }
  ];

  return (
    <div className="dashboard-card late-in-early-out-card">
      <div className="card-header-enhanced">
        <div className="header-left">
          <div className="card-icon-enhanced">⏰</div>
          <div className="title-section">
            <h3 className="card-title-enhanced">Late In & Early Out</h3>
            <p className="card-subtitle">Attendance Pattern Analysis</p>
          </div>
        </div>
        <div className="export-badge">📊</div>
      </div>
      
      <div className="late-in-early-out-content">
        <div className="dual-bar-section">
          <div className="dual-bar-grid">
            {dualBarData.map((day, i) => (
              <div key={i} className="dual-bar-column">
                <div className="dual-bar-wrapper">
                  <div className="bar-pair">
                    <div 
                      className="bar-late-in" 
                      style={{ height: `${(day.lateIn / 20) * 100}%` }}
                    >
                      <span className="bar-value">{day.lateIn}</span>
                    </div>
                    <div 
                      className="bar-early-out" 
                      style={{ height: `${(day.earlyOut / 20) * 100}%` }}
                    >
                      <span className="bar-value">{day.earlyOut}</span>
                    </div>
                  </div>
                </div>
                <span className="dual-bar-label">{day.day}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="dual-stats-summary">
          <div className="legend-section">
            <div className="legend-item">
              <div className="legend-color late-in"></div>
              <span className="legend-text">Late In</span>
            </div>
            <div className="legend-item">
              <div className="legend-color early-out"></div>
              <span className="legend-text">Early Out</span>
            </div>
          </div>
          
          <div className="summary-metrics">
            <div className="metric-card late-metric">
              <div className="metric-header">
                <span className="metric-icon">🔴</span>
                <span className="metric-title">Late Arrivals</span>
              </div>
              <div className="metric-value">{data?.firstPunchAfter930 ?? '-'}</div>
              <div className="metric-trend">This Week</div>
            </div>
            
            <div className="metric-card early-metric">
              <div className="metric-header">
                <span className="metric-icon">🟡</span>
                <span className="metric-title">Early Departures</span>
              </div>
              <div className="metric-value">{data?.lastPunchBefore530 ?? '-'}</div>
              <div className="metric-trend">This Week</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LateInEarlyOutCard;