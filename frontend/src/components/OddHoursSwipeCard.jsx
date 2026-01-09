import React from 'react';

const OddHoursSwipeCard = () => {
  return (
    <div className="chart-card odd-hours-card">
      <div className="chart-header">
        <div className="header-left">
          <span className="card-icon-enhanced">🌙</span>
          <h3>Odd Hrs In/Out Swipe</h3>
        </div>
        <div className="export-badge">📊</div>
      </div>
      
      <div className="odd-hours-content">
        <div className="hours-grid">
          <div className="hour-card">
            <div className="hour-header">
              <span className="hour-icon">🌅</span>
              <span className="hour-label">Before 8 AM</span>
            </div>
            <div className="hour-value">23</div>
            <div className="hour-trend">Early birds</div>
          </div>
          
          <div className="hour-card">
            <div className="hour-header">
              <span className="hour-icon">🌃</span>
              <span className="hour-label">After 8 PM</span>
            </div>
            <div className="hour-value">45</div>
            <div className="hour-trend">Night owls</div>
          </div>
        </div>
        
        <div className="swipe-summary">
          <div className="total-swipes">
            <span className="total-label">Total Swipes</span>
            <span className="total-value">2,847</span>
          </div>
          <div className="odd-percentage">
            <span className="percentage-value">2.4%</span>
            <span className="percentage-label">of total swipes</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OddHoursSwipeCard;