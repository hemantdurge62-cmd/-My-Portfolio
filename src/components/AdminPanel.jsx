import React, { useState, useEffect } from "react";
import "./AdminPanel.css";

const AdminPanel = ({ onClose }) => {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [stats, setStats] = useState({ projects: 3, certificates: 3 });
  const [loading, setLoading] = useState(false);

  // Authenticate locally first, then check header validity via API
  const handleLogin = (e) => {
    e.preventDefault();
    if (password === "hemant123") {
      setIsAuthenticated(true);
      setError("");
      fetchMessages();
      fetchStats();
    } else {
      setError("Incorrect admin password. Please try again.");
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/api/messages", {
        headers: {
          "x-admin-password": "hemant123",
        },
      });
      if (response.ok) {
        const data = await response.json();
        setMessages(data);
      } else {
        setError("Failed to authenticate API headers. Check backend status.");
      }
    } catch (err) {
      console.error("Error loading messages:", err);
      setError("Backend server seems offline. Start server on port 5000.");
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/portfolio");
      if (response.ok) {
        const data = await response.json();
        setStats({
          projects: data.projects ? data.projects.length : 3,
          certificates: data.certificates ? data.certificates.length : 3,
        });
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  };

  const handleDeleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;

    try {
      const response = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: "DELETE",
        headers: {
          "x-admin-password": "hemant123",
        },
      });

      if (response.ok) {
        // Refetch or filter locally for instant reactivity
        setMessages(messages.filter((m) => m.id !== id));
      } else {
        alert("Failed to delete message from server.");
      }
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Backend error during deletion.");
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    setMessages([]);
  };

  // Format Date ISO strings into readable local strings
  const formatDate = (isoString) => {
    const options = { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" };
    return new Date(isoString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="admin-backdrop" onClick={onClose}>
      <div className="admin-modal glass-panel" onClick={(e) => e.stopPropagation()}>
        <button className="admin-close-btn" onClick={onClose}>
          &times;
        </button>

        {/* 1. Login State Screen */}
        {!isAuthenticated ? (
          <div className="admin-login-view">
            <h2>🔑 Admin Control Panel</h2>
            <p>Please enter your secure access key to manage received contact form entries and site configurations.</p>
            
            <form onSubmit={handleLogin} className="admin-login-form">
              <input
                type="password"
                placeholder="Enter Admin Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoFocus
              />
              {error && <span className="login-error-msg">❌ {error}</span>}
              
              <div className="login-actions">
                <button type="submit" className="btn-premium primary">
                  Unlock Panel
                </button>
                <button type="button" className="btn-premium secondary" onClick={onClose}>
                  Exit Portal
                </button>
              </div>
            </form>
          </div>
        ) : (
          /* 2. Logged In Panel Dashboard Screen */
          <div className="admin-dashboard-view">
            <div className="admin-dash-header">
              <div>
                <h2>📊 Hemant's Portfolio Dashboard</h2>
                <p>Welcome back! Here is a live summary of your full-stack portfolio metrics.</p>
              </div>
              <div className="admin-header-actions">
                <button className="btn-premium secondary" onClick={handleLogout}>
                  Logout 🔒
                </button>
              </div>
            </div>

            {/* Metrics cards row */}
            <div className="admin-stats-row">
              <div className="admin-stat-card glass-panel">
                <span className="admin-stat-icon">📩</span>
                <div className="admin-stat-content">
                  <h4>Total Messages</h4>
                  <p>{messages.length}</p>
                </div>
              </div>

              <div className="admin-stat-card glass-panel">
                <span className="admin-stat-icon">🗂️</span>
                <div className="admin-stat-content">
                  <h4>Active Projects</h4>
                  <p>{stats.projects}</p>
                </div>
              </div>

              <div className="admin-stat-card glass-panel">
                <span className="admin-stat-icon">📜</span>
                <div className="admin-stat-content">
                  <h4>Credentials Served</h4>
                  <p>{stats.certificates}</p>
                </div>
              </div>
            </div>

            {/* Inbox Section */}
            <div className="admin-inbox-section">
              <div className="inbox-title-bar">
                <h3>📥 Inbound Messages Inbox ({messages.length})</h3>
                <button className="refresh-btn" onClick={fetchMessages} disabled={loading}>
                  {loading ? "Refreshing..." : "Sync Messages 🔄"}
                </button>
              </div>

              {loading ? (
                <div className="inbox-loading-state">
                  <div className="spinner-wrapper">
                    <span className="spinner-dot"></span>
                    <span className="spinner-dot"></span>
                    <span className="spinner-dot"></span>
                  </div>
                  <p>Fetching active messages...</p>
                </div>
              ) : messages.length === 0 ? (
                <div className="inbox-empty-state">
                  <span>📭</span>
                  <p>Your inbox is empty! When visitors submit contact forms, their messages will appear here in real-time.</p>
                </div>
              ) : (
                <div className="inbox-messages-list">
                  {messages.map((msg) => (
                    <div key={msg.id} className="inbox-msg-card glass-panel">
                      <div className="msg-card-header">
                        <div className="msg-sender-info">
                          <h5>{msg.name}</h5>
                          <a href={`mailto:${msg.email}`} className="msg-email-link">
                            {msg.email}
                          </a>
                        </div>
                        <div className="msg-date-info">
                          <span className="msg-date">{formatDate(msg.date)}</span>
                          <button 
                            className="msg-delete-btn" 
                            onClick={() => handleDeleteMessage(msg.id)}
                            title="Delete message"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                      <div className="msg-card-body">
                        <p>{msg.message}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
