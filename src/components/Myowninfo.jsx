import React, { useState, useEffect } from "react";
import "./Myowninfo.css";

// Fallback data if backend is offline
const fallbackSkillCategories = [
  {
    title: "⚡ Frontend Core",
    skills: ["React.js", "JavaScript (ES6+)", "HTML5", "CSS3 / Vanilla CSS", "Responsive Design", "Vite"],
  },
  {
    title: "⚙️ Backend & Systems",
    skills: ["Node.js", "Express.js", "MongoDB", "REST APIs", "JSON Data structures"],
  },
  {
    title: "🛠️ Tools & Workflows",
    skills: ["Git & GitHub", "npm / Node Package Manager", "VS Code", "Figma", "Chrome DevTools"],
  },
];

const MyOwnInfo = () => {
  const [skillCategories, setSkillCategories] = useState(fallbackSkillCategories);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/portfolio");
        if (response.ok) {
          const data = await response.json();
          if (data.skills) setSkillCategories(data.skills);
        }
      } catch (error) {
        console.error("Using offline fallback data for Skills");
      }
    };
    fetchSkills();
  }, []);
  return (
    <section className="info-section" id="about">
      <h2 className="section-title">About Me</h2>

      <div className="info-container">
        {/* Left Column - Biography */}
        <div className="info-left glass-panel">
          <div className="profile-decor"></div>
          <h3>Hi, I'm Hemant 👋</h3>
          <p className="bio-paragraph">
            I am a passionate, detail-oriented Web Developer who loves crafting elegant interfaces 
            and solving real-world challenges through clean code. I specialize in building highly responsive 
            and interactive front-end web applications with a focus on polished UI, robust architectures, and 
            stellar performance.
          </p>

          <p className="highlight">
            💡 "I strive to bridge the gap between complex engineering and beautiful, intuitive user-experience."
          </p>
        </div>

        {/* Right Column - Goal, Education, Certificates Overview */}
        <div className="info-right">
          <div className="info-box glass-panel">
            <div className="box-icon">🎯</div>
            <div className="box-content">
              <h4>Career Goal</h4>
              <p>
                To secure a challenging role as a Full-Stack Web Developer, building high-performance scalable 
                systems, collaborating on impactful open-source contributions, and continuously pushing technical limits.
              </p>
            </div>
          </div>

          <div className="info-box glass-panel">
            <div className="box-icon">🎓</div>
            <div className="box-content">
              <h4>Education</h4>
              <p>
                <strong>Bachelor of Computer Science / Engineering</strong><br />
                Pursuing Degree • India
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Grid Section */}
      <div className="skills-section-wrapper" id="skills">
        <h3 className="skills-grid-title">My Technical Toolbox</h3>
        
        <div className="skills-grid-container">
          {skillCategories.map((category, catIndex) => (
            <div key={catIndex} className="skills-card glass-panel">
              <h4 className="skills-category-title">{category.title}</h4>
              <div className="skills-badges-list">
                {category.skills.map((skill, skillIndex) => (
                  <span key={skillIndex} className="skill-badge">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MyOwnInfo;