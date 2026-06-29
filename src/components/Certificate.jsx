import React, { useState, useEffect } from "react";
import "./Certificate.css";

// Fallback data if backend is offline
const fallbackCertificates = [
  {
    title: "Full-Stack Web Development Bootcamp",
    issuer: "Udemy",
    date: "2025",
    code: "UC-488f572a-9e12-4c8d-b772",
    skills: ["React.js", "Node.js", "Express.js", "MongoDB", "SQL Basics", "Git & GitHub"],
    link: "https://udemy.com",
    badgeColor: "linear-gradient(135deg, #FFD700, #FFA500)" // Gold
  },
  {
    title: "Advanced React Developer Certification",
    issuer: "Coursera",
    date: "2025",
    code: "COURSERA-RX90374L",
    skills: ["State Management (Redux/Context)", "Custom Hooks", "React Performance Optimization", "Hooks Architecture"],
    link: "https://coursera.org",
    badgeColor: "linear-gradient(135deg, #00C9FF, #92FE9D)" // Teal
  },
  {
    title: "Regional Hackathon Outstanding Participation",
    issuer: "University Innovation Event",
    date: "2026",
    code: "HACK-2026-MEMBER-48",
    skills: ["Rapid Prototyping", "Team Collaboration", "UI/UX Pitching", "Product Design"],
    link: "#",
    badgeColor: "linear-gradient(135deg, #f857a6, #ff5858)" // Neon Pink
  },
  // User's SSC certificate (placeholder page)
  {
    title: "Secondary School Certificate (SSC)",
    issuer: "State Board",
    date: "2023",
    code: "SSC-2023-HEMANT-01",
    skills: ["Foundations of Science", "Mathematics", "English Communication"],
    link: "/certificates/ssc.html",
    badgeColor: "linear-gradient(135deg, #FFD700, #FFB703)"
  },
];

const Certificate = () => {
  const [certificates, setCertificates] = useState(fallbackCertificates);
  const [selectedCert, setSelectedCert] = useState(null);

  useEffect(() => {
    const fetchCertificates = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/portfolio");
        if (response.ok) {
          const data = await response.json();
          if (data.certificates) setCertificates(data.certificates);
        }
      } catch (error) {
        console.error("Using offline fallback data for Certificates");
      }
    };
    fetchCertificates();
  }, []);

  return (
    <section className="certificate-section" id="certificates">
      <h2 className="section-title">Achievements & Credentials</h2>

      <div className="certificate-container">
        {certificates.map((cert, index) => (
          <div 
            className="certificate-card glass-panel" 
            key={index}
            onClick={() => setSelectedCert(cert)}
          >
            <div className="cert-card-header">
              <div 
                className="cert-mini-badge" 
                style={{ background: cert.badgeColor }}
              >
                📜
              </div>
              <span className="cert-date">{cert.date}</span>
            </div>

            <h3>{cert.title}</h3>
            <p className="issuer">Issued by: <strong>{cert.issuer}</strong></p>
            
            <div className="cert-card-footer">
              <span className="cert-code-preview">ID: {cert.code.substring(0, 10)}...</span>
              <span className="cert-view-action">View Credential →</span>
            </div>
          </div>
        ))}
      </div>

      {/* Interactive Certificate Lightbox Modal */}
      {selectedCert && (
        <div className="cert-lightbox-backdrop" onClick={() => setSelectedCert(null)}>
          <div className="cert-lightbox-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="cert-modal-close" onClick={() => setSelectedCert(null)}>
              &times;
            </button>

            {/* simulated official digital certificate */}
            <div className="official-cert-layout">
              <div className="cert-border-ring">
                <div className="cert-watermark">CREDENTIAL</div>
                
                {/* Header */}
                <div className="cert-header-sec">
                  <div className="cert-official-seal" style={{ background: selectedCert.badgeColor }}>
                    ★
                  </div>
                  <h3>CERTIFICATE OF ACHIEVEMENT</h3>
                  <p className="cert-sub-heading">This official credential declares that</p>
                </div>

                {/* Recipient */}
                <div className="cert-recipient-sec">
                  <h2>Hemant Durge</h2>
                  <div className="cert-divider-line"></div>
                  <p className="cert-success-phrase">
                    has successfully completed all curricular requirements and demonstrated master-level capability in
                  </p>
                  <h4>{selectedCert.title}</h4>
                </div>

                {/* Skills verified */}
                <div className="cert-skills-sec">
                  <span className="skills-lbl">Verified Skills:</span>
                  <div className="cert-skills-list">
                    {selectedCert.skills.map((s, idx) => (
                      <span key={idx} className="cert-skill-tag">{s}</span>
                    ))}
                  </div>
                </div>

                {/* Footer section with signatures & codes */}
                <div className="cert-footer-sec">
                  <div className="cert-sig-block">
                    <span className="sig-line">Hemant Durge</span>
                    <span className="sig-lbl">Candidate Signature</span>
                  </div>
                  <div className="cert-sig-block">
                    <span className="sig-line-official">{selectedCert.issuer}</span>
                    <span className="sig-lbl">Authority Issuer</span>
                  </div>
                  <div className="cert-code-block">
                    <span className="code-lbl">CREDENTIAL ID</span>
                    <span className="code-val">{selectedCert.code}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Buttons for verifying and closing */}
            <div className="cert-lightbox-actions">
              {selectedCert.link !== "#" && (
                <a href={selectedCert.link} target="_blank" rel="noreferrer" className="btn-premium primary">
                  Verify Live Credential 🌐
                </a>
              )}
              <button className="btn-premium secondary" onClick={() => setSelectedCert(null)}>
                Close Viewer
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Certificate;