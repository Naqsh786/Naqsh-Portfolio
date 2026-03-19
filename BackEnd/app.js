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

// 1. CORS - Standard reflected origin for credentials support
app.use(cors({
  origin: true,
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "Accept", "X-Requested-With"]
}));

// 2. Body Parsing
app.use(express.json());

// 3. Database Connection (Ensure connection on every request for Vercel)
app.use(async (req, res, next) => {
  // Preflight check doesn't need DB
  if (req.method === "OPTIONS") return next();

  try {
    const mongoUri = process.env.DATABASE || process.env.MONGO_URI;
    if (!mongoUri) throw new Error("Database URI is missing from environment");
    
    await connectDB();
    next();
  } catch (err) {
    console.error("🔥 DB Error:", err.message);
    res.status(500).json({ success: false, message: "Server connection to DB failed", error: err.message });
  }
});

// Root Route
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Naqsh Portfolio Backend API is online",
    version: "1.0.0",
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/profile", profileRoutes);

// Generic Error Handlers
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Endpoint no found" });
});

app.use((err, req, res, _next) => {
  console.error(err);
  res.status(err.status || 500).json({ success: false, message: err.message });
});

// Initiate connection attempt early (non-blocking)
connectDB().catch(err => console.error("Initial DB connect error:", err.message));

export default app;
