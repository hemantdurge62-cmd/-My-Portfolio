import React, { useState, useEffect } from "react";
import "./Resume.css";

// Fallback data if backend is offline
const fallbackMilestones = [
  {
    year: "2026 - Present",
    title: "React Web Developer & Freelancer",
    subtitle: "Self-Employed / Client Projects",
    desc: "Developing custom, high-end responsive websites and SaaS interfaces for clients, incorporating glassmorphic designs and custom CSS styling.",
  },
  {
    year: "2025",
    title: "Created Smart Civic Systems",
    subtitle: "Open Source / Independent Developer",
    desc: "Architected and built the Smart Garbage Reporting System web portal utilizing React, Node.js, and MongoDB to streamline community cleanup requests.",
  },
  {
    year: "2024 - Present",
    title: "Pursuing Engineering Degree",
    subtitle: "Computer Science & Engineering Studies",
    desc: "Mastering database management systems, data structures, algorithms, object-oriented concepts, and fundamentals of UI/UX design.",
  },
  {
    year: "2023",
    title: "Started Software Engineering Journey",
    subtitle: "The Foundation",
    desc: "Began studying core web architectures, building fluid user experiences using modern HTML5, CSS3, and core JavaScript logic structures.",
  },
];

const Resume = () => {
  const [milestones, setMilestones] = useState(fallbackMilestones);

  useEffect(() => {
    const fetchMilestones = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/portfolio");
        if (response.ok) {
          const data = await response.json();
          if (data.milestones) setMilestones(data.milestones);
        }
      } catch (error) {
        console.error("Using offline fallback data for Milestones");
      }
    };
    fetchMilestones();
  }, []);
  return (
    <section className="resume-section" id="resume">
      <h2 className="section-title">My Journey</h2>

      <div className="resume-container">
        {/* Left Side: Summary & Quick Stats */}
        <div className="resume-left glass-panel">
          <h3 className="resume-sub">Why Hire Me?</h3>
          <p className="resume-intro">
            I am a highly motivated developer who thrives on continuous learning and turning complex ideas 
            into responsive, user-centric interfaces. My academic background, combined with hands-on project creation, 
            allows me to approach challenges with structured logic and creative solutions.
          </p>

          {/* Quick Metrics Stats */}
          <div className="resume-stats-grid">
            <div className="stat-card">
              <span className="stat-num">3+</span>
              <span className="stat-lbl">Projects Done</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">10+</span>
              <span className="stat-lbl">Skills Mastered</span>
            </div>
            <div className="stat-card">
              <span className="stat-num">24/7</span>
              <span className="stat-lbl">Passion Driven</span>
            </div>
          </div>

          <div className="profile-details-list">
            <p><strong>📍 Location:</strong> India</p>
            <p><strong>💼 Availability:</strong> Open for Internships & Freelancing</p>
          </div>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <a href="/resume.html" target="_blank" rel="noopener noreferrer" className="btn-premium primary download-btn">
              Open Resume 📄
            </a>
            <a href="/resume.html?print=1" target="_blank" rel="noopener noreferrer" className="btn-premium primary download-btn">
              Save as PDF (Print) 💾
            </a>
            <a href="#contact" className="btn-premium secondary download-btn">
              Get In Touch 🚀
            </a>
          </div>
        </div>

        {/* Right Side: Glowing Vertical Timeline */}
        <div className="resume-right">
          <div className="timeline-track"></div>

          {milestones.map((item, index) => (
            <div className="timeline-item" key={index}>
              {/* Pulsing indicator node */}
              <div className="timeline-node">
                <div className="node-pulse"></div>
              </div>

              <div className="timeline-card glass-panel">
                <span className="timeline-year">{item.year}</span>
                <h4>{item.title}</h4>
                <h5>{item.subtitle}</h5>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Resume;