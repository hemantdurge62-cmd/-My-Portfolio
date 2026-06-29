import React, { useState, useEffect } from "react";
import "./Project.css";

// Fallback data if backend is offline
const fallbackProjects = [
  {
    title: "Smart Garbage Reporting System",
    desc: "A web platform where users can upload garbage images and report issues directly to authorities.",
    longDesc: "A complete crowdsourced civic application designed to streamline waste management. Citizens can take photos of public litter, automatically tag their location, and submit reports. Authorities access a dedicated dashboard displaying an interactive map heatmap to optimize cleanup routes and track task completion.",
    tech: "React, Node.js, MongoDB",
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Cloudinary API", "Leaflet Maps"],
    features: [
      "Geolocation auto-tagging for precise coordinates",
      "Secure image uploading and optimization in the cloud",
      "Interactive admin dashboard with real-time analytics",
      "Task assignment system and status update triggers"
    ],
    image: "https://cdn-icons-png.flaticon.com/512/869/869636.png",
    category: "fullstack",
    github: "https://github.com",
    live: "#",
  }
];

const Project = () => {
  const [projects, setProjects] = useState(fallbackProjects);
  const [filter, setFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/portfolio");
        if (response.ok) {
          const data = await response.json();
          if (data.projects) setProjects(data.projects);
        }
      } catch (error) {
        console.error("Using offline fallback data for Projects");
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((proj) => {
    if (filter === "all") return true;
    return proj.category === filter;
  });

  return (
    <section className="project-section" id="projects">
      <h2 className="section-title">My Projects</h2>

      {/* Filter Tabs */}
      <div className="filter-tabs">
        {["all", "react", "fullstack", "frontend"].map((cat) => (
          <button
            key={cat}
            className={`filter-btn ${filter === cat ? "active" : ""}`}
            onClick={() => setFilter(cat)}
          >
            {cat === "all" ? "All Projects" : cat.toUpperCase()}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <div className="project-container">
        {filteredProjects.map((proj, index) => (
          <div 
            className="project-card glass-panel" 
            key={index}
            onClick={() => setSelectedProject(proj)}
          >
            <div className="project-img-wrapper">
              <img src={proj.image} alt={proj.title} className="project-image" />
              <div className="project-overlay">
                <span>View Details</span>
              </div>
            </div>

            <div className="project-info-content">
              <h3>{proj.title}</h3>
              <p>{proj.desc}</p>
              
              <div className="tech-badge-container">
                {proj.techStack.slice(0, 3).map((t, idx) => (
                  <span key={idx} className="tech-badge">{t}</span>
                ))}
                {proj.techStack.length > 3 && <span className="tech-badge-more">+{proj.techStack.length - 3}</span>}
              </div>

              <div className="project-card-footer">
                <span className="project-cat-badge">{proj.category}</span>
                <span className="learn-more">Learn More →</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Project Details Glass Modal */}
      {selectedProject && (
        <div className="modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="project-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProject(null)}>
              &times;
            </button>

            <div className="modal-grid">
              <div className="modal-left">
                <img 
                  src={selectedProject.image} 
                  alt={selectedProject.title} 
                  className="modal-project-img" 
                />
                <div className="modal-links">
                  <a href={selectedProject.live} target="_blank" rel="noreferrer" className="btn-premium primary">
                    Live Demo 🔗
                  </a>
                  <a href={selectedProject.github} target="_blank" rel="noreferrer" className="btn-premium secondary">
                    GitHub Code 💻
                  </a>
                </div>
              </div>

              <div className="modal-right">
                <span className="modal-cat">{selectedProject.category.toUpperCase()}</span>
                <h2>{selectedProject.title}</h2>
                <p className="modal-long-desc">{selectedProject.longDesc}</p>

                <div className="modal-section">
                  <h4>🛠️ Tech Stack Used</h4>
                  <div className="modal-tech-list">
                    {selectedProject.techStack.map((t, idx) => (
                      <span key={idx} className="modal-tech-tag">{t}</span>
                    ))}
                  </div>
                </div>

                <div className="modal-section">
                  <h4>💡 Key Features</h4>
                  <ul className="modal-features-list">
                    {selectedProject.features.map((feat, idx) => (
                      <li key={idx}>✅ {feat}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Project;
