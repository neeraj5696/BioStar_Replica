import React, { useState } from 'react';

const SwipeDataCard = () => {
  const [activeTab, setActiveTab] = useState('24hrs');

  return (
    <div className="swipe-data-card">
      <div className="swipe-header">
        <h3 className="swipe-title">Swipe Data</h3>
        <div className="time-tabs">
          <button 
            className={`tab-btn ${activeTab === '24hrs' ? 'active' : ''}`}
            onClick={() => setActiveTab('24hrs')}
          >
            24 Hrs
          </button>
          <button 
            className={`tab-btn ${activeTab === '45days' ? 'active' : ''}`}
            onClick={() => setActiveTab('45days')}
          >
            45 Days
          </button>
        </div>
      </div>
      
      <div className="swipe-content">
        <div className="total-swipes">
          <span className="swipe-count">2,847</span>
          <span className="swipe-label">total swipes</span>
        </div>
        
        <div className="swipe-chart">
          <svg viewBox="0 0 280 80" className="chart-svg">
            <defs>
              <linearGradient id="swipeGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#14b8a6" stopOpacity="0.4" />
                <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <path 
              d="M0,60 Q70,30 140,35 T280,25 L280,80 L0,80 Z" 
              fill="url(#swipeGradient)" 
            />
            <path 
              d="M0,60 Q70,30 140,35 T280,25" 
              fill="none" 
              stroke="#14b8a6" 
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SwipeDataCard;