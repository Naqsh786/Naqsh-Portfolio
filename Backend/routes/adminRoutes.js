const express = require("express");
const router = express.Router();
const rateLimit = require("express-rate-limit");
const authMiddleware = require("../middleware/authMiddleware");
const {
  adminLogin,
  getMessages,
  toggleReadStatus,
  deleteMessage,
  getStats
} = require("../controllers/adminController");

// Strict rate limiter for admin login: max 5 requests every 15 minutes per IP address
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    message: "Too many login attempts. Please try again after 15 minutes."
  }
});

router.post("/login", loginLimiter, adminLogin);
router.get("/messages", authMiddleware, getMessages);
router.patch("/messages/:id/read", authMiddleware, toggleReadStatus);
router.delete("/messages/:id", authMiddleware, deleteMessage);
router.get("/stats", authMiddleware, getStats);

module.exports = router;
