import React from 'react';
import './LinkedinCard.css';

const LinkedinCard = ({ onClose }) => {
  return (
    <div className="linkedin-modal-overlay" onClick={onClose}>
      <div className="linkedin-card-wrapper" onClick={(e) => e.stopPropagation()}>
        <button className="linkedin-close-btn" onClick={onClose}>×</button>
        <div className="linkedin-banner">
        <div className="linkedin-profile-pic"></div>
      </div>
      
      <div className="linkedin-content">
        <div className="linkedin-header">
          <div className="linkedin-info">
            <div className="linkedin-name-row">
              <h1 className="linkedin-name">Hemant Durge</h1>
              <span className="linkedin-badge">✓</span>
              <span className="linkedin-pronouns">He/Him • 1st</span>
            </div>
            
            <p className="linkedin-headline">
              Web Developer | Building modern user-friendly experiences | React & Node.js Enthusiast
            </p>
            
            <p className="linkedin-location">
              India • <a href="#contact">Contact info</a>
            </p>
            
            <a href="https://www.linkedin.com/in/hemant-durge-343011397" target="_blank" rel="noopener noreferrer" className="linkedin-connections">
              500+ connections
            </a>
            
            <div className="linkedin-buttons">
              <a href="https://www.linkedin.com/in/hemant-durge-343011397" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                <button className="btn-primary">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" data-supported-dps="24x24" fill="currentColor" width="16" height="16" focusable="false">
                    <path d="M21 3L0 10l7.66 4.26L16 8l-6.26 8.34L14 24l7-21z"></path>
                  </svg>
                  Message
                </button>
              </a>
              <a href="https://www.linkedin.com/in/hemant-durge-343011397" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none'}}>
                <button className="btn-secondary">More</button>
              </a>
            </div>
          </div>
          
          <div className="linkedin-education">
            <div className="edu-item">
              <div className="edu-icon">🎓</div>
              <span>Bachelor of Computer Science / Engineering</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default LinkedinCard;
