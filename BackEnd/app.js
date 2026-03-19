import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./DB.js";
import projectRoutes from "./routes/projectRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

// Load Env
dotenv.config();

const app = express();

// Regular Middleware - MUST BE FIRST
const corsOptions = {
  origin: ["https://naqsh-protfolio-f.vercel.app", "http://localhost:5173", "http://localhost:5174", "http://localhost:3000"],
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  optionsSuccessStatus: 204, // Some legacy browsers crash on 200
};
app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Enable preflight for all routes

app.use(express.json());

// Top-level connection for instant feedback (similar to Events project)
try {
  await connectDB();
} catch {
  console.error("🚀 Initial DB connection effort started...");
}

// Middleware to ensure DB is connected for every request (essential for Vercel/Serverless cold starts)
app.use(async (req, res, next) => {
  // Skip database check for preflight/OPTIONS requests
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    const mongoUri = process.env.DATABASE || process.env.MONGO_URI;
    if (!mongoUri) {
      console.error("FATAL: DATABASE or MONGO_URI environment variable is missing!");
      return res.status(500).json({ success: false, message: "Database config missing" });
    }

    await connectDB();
    next();
  } catch (err) {
    console.error("Critical Database Connection Error in Middleware:", {
      message: err.message,
    });
    res.status(500).json({
      success: false,
      message: "Internal Server Error: Database initialization failed",
      error: err.message,
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
