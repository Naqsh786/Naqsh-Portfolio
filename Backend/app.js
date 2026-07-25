require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB, getIsConnected } = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Initialize Database Connection
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/contact", contactRoutes);
app.use("/api/admin", adminRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    mongoConnected: getIsConnected(),
    timestamp: new Date()
  });
});

module.exports = app;
