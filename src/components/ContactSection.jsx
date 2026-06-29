import React, { useState } from "react";
import "./ContactSection.css";

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | submitting | success

  const validate = () => {
    let errs = {};
    if (!formData.name.trim()) errs.name = "Name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (!formData.message.trim()) {
      errs.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      errs.message = "Message must be at least 10 characters long";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    // Clear specific error as user types
    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setStatus("submitting");

    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert("Failed to send message. Please try again later.");
        setStatus("idle");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Network error. Backend might be offline.");
      setStatus("idle");
    }
  };

  const handleResetForm = () => {
    setStatus("idle");
  };

  return (
    <section className="contact-section" id="contact">
      <h2 className="section-title">Get In Touch</h2>

      <div className="contact-container">
        {/* Left Column: Direct Info & Social Connections */}
        <div className="contact-info glass-panel">
          <h3>Let's Connect 🚀</h3>
          <p className="contact-desc">
            Have an exciting project proposal, a job opening, or just want to talk about front-end designs? 
            Drop a message in the box, or reach out to me directly through any of the channels below!
          </p>

          <div className="contact-channels">
            <div className="channel-box">
              <span className="channel-icon">📧</span>
              <div className="channel-txt">
                <span className="channel-label">Email Me</span>
                <a href="mailto:hemantdurge62@gmail.com" className="channel-val">hemantdurge62@gmail.com</a>
              </div>
            </div>

            <div className="channel-box">
              <span className="channel-icon">📞</span>
              <div className="channel-txt">
                <span className="channel-label">Call Me</span>
                <a href="tel:8999871161" className="channel-val">+91 8999871161</a>
              </div>
            </div>
          </div>

          <div className="social-links-container">
            <h4>Follow My Coordinates</h4>
            <div className="social-grid">
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-tag">LinkedIn</a>
              <a href="https://github.com" target="_blank" rel="noreferrer" className="social-tag">GitHub</a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-tag">Instagram</a>
            </div>
          </div>
        </div>

        {/* Right Column: Animated Card Flip Interactive Form */}
        <div className={`contact-form-wrapper glass-panel ${status === "success" ? "flipped" : ""}`}>
          <div className="form-card-inner">
            {/* Front Side: Active Form */}
            <div className="form-card-front">
              <h3>Send A Message</h3>
              
              <form onSubmit={handleSubmit} noValidate>
                <div className={`input-group ${errors.name ? "has-error" : ""}`}>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                    disabled={status === "submitting"}
                  />
                  <label>Your Name</label>
                  {errors.name && <span className="error-txt">{errors.name}</span>}
                </div>

                <div className={`input-group ${errors.email ? "has-error" : ""}`}>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder=" "
                    required
                    disabled={status === "submitting"}
                  />
                  <label>Your Email</label>
                  {errors.email && <span className="error-txt">{errors.email}</span>}
                </div>

                <div className={`input-group ${errors.message ? "has-error" : ""}`}>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    rows="4"
                    placeholder=" "
                    required
                    disabled={status === "submitting"}
                  ></textarea>
                  <label>Your Message</label>
                  {errors.message && <span className="error-txt">{errors.message}</span>}
                </div>

                <button
                  type="submit"
                  className="btn-premium primary submit-btn"
                  disabled={status === "submitting"}
                >
                  {status === "submitting" ? (
                    <div className="spinner-wrapper">
                      <span className="spinner-dot"></span>
                      <span className="spinner-dot"></span>
                      <span className="spinner-dot"></span>
                    </div>
                  ) : (
                    "Send Message 📤"
                  )}
                </button>
              </form>
            </div>

            {/* Back Side: Success Confirmation */}
            <div className="form-card-back">
              <div className="success-icon-wrap">
                <div className="success-pulse"></div>
                <span className="success-checkmark">✓</span>
              </div>
              <h3>Message Sent!</h3>
              <p>
                Thank you so much! Your message has been beamed successfully. I will review it and get back to you 
                within 24 hours.
              </p>
              <button className="btn-premium secondary reset-btn" onClick={handleResetForm}>
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;