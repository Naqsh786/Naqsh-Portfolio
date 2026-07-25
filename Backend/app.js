require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { connectDB, getIsConnected } = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();

// Initialize Database Connection
connectDB();

// Middleware to ensure DB connection for every request (essential for Vercel serverless cold starts)
app.use(async (req, res, next) => {
  try {
    await connectDB();
  } catch (err) {
    console.error("DB connection error in middleware:", err.message);
  }
  next();
});

// Middleware
app.use(cors());
app.use(express.json());

// Root Route - Health Check
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Naqsh Portfolio Backend API is running",
    version: "1.0.0"
  });
});

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

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found"
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Error Caught:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err.toString()
  });
});

module.exports = app;
