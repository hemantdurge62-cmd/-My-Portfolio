import React from "react";
import "./Footer.css";

const Footer = ({ onOpenAdmin, onOpenLinkedin }) => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Left */}
        <div className="footer-left">
          <h3>Hemant Durge</h3>
          <p>Building modern and user-friendly web experiences 🚀</p>
        </div>

        {/* Center */}
        <div className="footer-links">
          <h4>Quick Links</h4>
          <a href="#home">Home</a>
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#contact">Contact</a>
        </div>

        {/* Right */}
        <div className="footer-social">
          <h4>Follow Me</h4>
          <button className="linkedin-footer-trigger" onClick={onOpenLinkedin} style={{background: 'none', border: 'none', color: '#f8fafc', textDecoration: 'none', cursor: 'pointer', padding: 0, font: 'inherit', textAlign: 'left', marginBottom: '8px'}}>LinkedIn</button>
          <a href="https://github.com/hemantdurge62-cmd" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="#">Instagram</a>
        </div>

      </div>

      {/* Bottom */}
      <div className="footer-bottom">
        <p>© 2026 Hemant Durge | All Rights Reserved</p>
        {/* Admin Portal button removed for security */}
      </div>
    </footer>
  );
};

export default Footer;