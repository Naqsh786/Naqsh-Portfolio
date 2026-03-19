import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

/**
 * @desc    Admin login
 * @route   POST /api/auth/login
 */
router.post("/login", (req, res) => {
  const { password } = req.body;

  if (password === process.env.ADMIN_PASSWORD) {
    const token = jwt.sign(
      { role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.json({ token, success: true });
  } else {
    res.status(401).json({ success: false, message: "Invalid password" });
  }
});

export default router;
