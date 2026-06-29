import React, { useEffect, useState } from "react";
import "./Hero.css";
import ParticleCanvas from "./ParticleCanvas";

const roles = ["Web Developer", "UI Designer", "React Developer", "Creative Thinker"];

const Hero = () => {
  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (index === roles.length) return setIndex(0);

    if (subIndex === roles[index].length + 1 && !deleting) {
      setTimeout(() => setDeleting(true), 1500);
      return;
    }

    if (subIndex === 0 && deleting) {
      setDeleting(false);
      setIndex((prev) => prev + 1);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (deleting ? -1 : 1));
      setText(roles[index].substring(0, subIndex));
    }, deleting ? 40 : 80);

    return () => clearTimeout(timeout);
  }, [subIndex, index, deleting]);

  const handleScrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 70,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="hero" id="home">
      {/* Interactive Particle Web Canvas */}
      <ParticleCanvas />

      <div className="hero-content">
        <h3 className="hero-subtitle">Hello, I'm</h3>
        <h1 className="hero-title">Hemant Durge</h1>

        <h2 className="hero-typing-wrap">
          I'm a <span className="typing">{text}</span>
        </h2>

        <p className="hero-description">
          I craft highly interactive, responsive, and pixel-perfect web applications 
          with premium user experience, elegant modern aesthetics, and seamless performance.
        </p>

        <div className="hero-buttons">
          <a 
            href="/resume.pdf" 
            download="Hemant_Durge_Resume.pdf"
            className="btn-premium primary" 
          >
            Download CV
          </a>
          <button 
            className="btn-premium secondary" 
            onClick={() => handleScrollTo("resume")}
          >
            Explore Journey
          </button>
        </div>
      </div>

      <div className="hero-image-container">
        <div className="image-backdrop"></div>
        <img
          className="hero-avatar"
          src="https://cdn-icons-png.flaticon.com/512/4140/4140048.png"
          alt="Hemant Durge Profile"
        />
      </div>
    </section>
  );
};

export default Hero;