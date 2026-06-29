import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Load configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || "hemant123"; // Default password fallback

// Resolve ESModule directory paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DATA_DIR = path.join(__dirname, "data");
const PORTFOLIO_PATH = path.join(DATA_DIR, "portfolio.json");
const MESSAGES_PATH = path.join(DATA_DIR, "messages.json");

// Middleware
const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];
app.use(cors({ 
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  }
}));
app.use(express.json());

// Auto-Initialize Directory & Database Files
const initDatabase = () => {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
    console.log("📁 Created data directory at:", DATA_DIR);
  }

  if (!fs.existsSync(MESSAGES_PATH)) {
    fs.writeFileSync(MESSAGES_PATH, JSON.stringify([], null, 2), "utf8");
    console.log("💾 Initialized empty messages database.");
  }
};
initDatabase();

// Security Helper: Check Admin password header
const authorizeAdmin = (req, res, next) => {
  const password = req.headers["x-admin-password"];
  if (password === ADMIN_PASSWORD) {
    next();
  } else {
    res.status(401).json({ error: "Unauthorized access: Invalid admin password" });
  }
};

// ================= API ENDPOINTS =================

// 1. GET Portfolio content
app.get("/api/portfolio", (req, res) => {
  try {
    if (!fs.existsSync(PORTFOLIO_PATH)) {
      return res.status(404).json({ error: "Portfolio database file not found." });
    }
    const rawData = fs.readFileSync(PORTFOLIO_PATH, "utf8");
    const data = JSON.parse(rawData);
    res.json(data);
  } catch (error) {
    console.error("Error reading portfolio data:", error);
    res.status(500).json({ error: "Failed to read portfolio database." });
  }
});

// 2. POST contact message submission
app.post("/api/contact", (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Server-Side validations
    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required (name, email, message)" });
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({ error: "Invalid email syntax" });
    }
    if (message.trim().length < 10) {
      return res.status(400).json({ error: "Message must be at least 10 characters long" });
    }

    // Read existing database
    const rawData = fs.readFileSync(MESSAGES_PATH, "utf8");
    const messages = JSON.parse(rawData);

    // Create new message record
    const newMessage = {
      id: Date.now().toString(),
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      date: new Date().toISOString(),
    };

    messages.unshift(newMessage); // Append to top of inbox
    fs.writeFileSync(MESSAGES_PATH, JSON.stringify(messages, null, 2), "utf8");

    console.log(`📩 New message received from ${name} (${email})`);
    res.status(201).json({ success: true, message: "Message saved successfully!", data: newMessage });
  } catch (error) {
    console.error("Error saving contact submission:", error);
    res.status(500).json({ error: "Failed to save message on backend server." });
  }
});

// 3. GET inbox messages (Authorized admin only)
app.get("/api/messages", authorizeAdmin, (req, res) => {
  try {
    const rawData = fs.readFileSync(MESSAGES_PATH, "utf8");
    const messages = JSON.parse(rawData);
    res.json(messages);
  } catch (error) {
    console.error("Error loading inbox messages:", error);
    res.status(500).json({ error: "Failed to read messages database." });
  }
});

// 4. DELETE specific inbox message by ID (Authorized admin only)
app.delete("/api/messages/:id", authorizeAdmin, (req, res) => {
  try {
    const { id } = req.params;
    const rawData = fs.readFileSync(MESSAGES_PATH, "utf8");
    const messages = JSON.parse(rawData);

    const filteredMessages = messages.filter((m) => m.id !== id);
    
    if (messages.length === filteredMessages.length) {
      return res.status(404).json({ error: "Message with specified ID not found." });
    }

    fs.writeFileSync(MESSAGES_PATH, JSON.stringify(filteredMessages, null, 2), "utf8");
    console.log(`🗑️ Deleted message ID: ${id}`);
    res.json({ success: true, message: "Message deleted successfully." });
  } catch (error) {
    console.error("Error deleting message:", error);
    res.status(500).json({ error: "Failed to delete message from database." });
  }
});

// Startup confirmation
app.listen(PORT, () => {
  console.log(`🚀 Portfolio Express Server running at: http://localhost:${PORT}`);
});
