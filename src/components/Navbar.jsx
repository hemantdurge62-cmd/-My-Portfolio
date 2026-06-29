import React, { useState, useEffect } from "react";
import "./Navbar.css";

const Navbar = () => {
  const [active, setActive] = useState("Home");
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const menuItems = ["Home", "About", "Projects", "Certificates", "Resume", "Contact"];

  useEffect(() => {
    const handleScroll = () => {
      // Add background blur/color when scrolled
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // Scroll Spy logic
      const sections = ["home", "about", "projects", "certificates", "resume", "contact"];
      const scrollPosition = window.scrollY + 120; // Offset for navbar height and breathing room

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            // Capitalize first letter to match active state key
            setActive(section.charAt(0).toUpperCase() + section.slice(1));
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (item) => {
    setActive(item);
    setIsOpen(false);
    const targetId = item.toLowerCase();
    const el = document.getElementById(targetId);
    if (el) {
      const navbarHeight = 70;
      const targetPosition = el.offsetTop - navbarHeight;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="logo" onClick={() => handleNavClick("Home")}>
        Hemant<span>.</span>
      </div>

      {/* Hamburger menu for responsive mobile design */}
      <div className={`hamburger ${isOpen ? "open" : ""}`} onClick={() => setIsOpen(!isOpen)}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Nav Links */}
      <ul className={`nav-links ${isOpen ? "open" : ""}`}>
        {menuItems.map((item) => (
          <li
            key={item}
            className={active === item ? "active" : ""}
            onClick={() => handleNavClick(item)}
          >
            {item}
          </li>
        ))}
      </ul>

      <button className="hire-btn" onClick={() => handleNavClick("Contact")}>
        Hire Me
      </button>
    </nav>
  );
};

export default Navbar;