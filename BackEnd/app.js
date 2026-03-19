import dotenv from "dotenv";
// Load Env IMMEDIATELY before other imports
dotenv.config();

import express from "express";
import cors from "cors";
import connectDB from "./DB.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const app = express();

// 1. CORS - Standard loose configuration for debugging
app.use(cors({
  origin: function (origin, callback) {
    // Allow all origins including localhost, vercel deployments, etc.
    // In production, you'd want to restrict this more.
    callback(null, true);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"]
}));

// 2. Parse JSON
app.use(express.json());

// 3. Database Connection Middleware (Lazy Connection)
app.use(async (req, res, next) => {
  // Always skip heavy DB logic for preflight
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const mongoUri = process.env.DATABASE || process.env.MONGO_URI;
    if (!mongoUri) {
      console.error("FATAL: DATABASE or MONGO_URI env var is missing!");
      return res.status(500).json({ success: false, message: "Server Configuration Error: DB URI Missing" });
    }

    await connectDB();
    next();
  } catch (err) {
    console.error("DB Connection Error in Middleware:", err.message);
    // Don't kill the request, but log it clearly
    // If it's a persistent error, return 500
    return res.status(500).json({
      success: false,
      message: "Database initialization failed",
      error: err.message
    });
  }
});

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Naqsh Portfolio Backend API is running",
    version: "1.0.0",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profile", profileRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Global Error Handler
app.use((err, req, res, _next) => {
  console.error("Global Error Caught:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
    error: err.toString(),
  });
});

export default app;
