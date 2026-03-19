import express from "express";
const router = express.Router();
import { getProfile, updateProfile } from "../controllers/profileController.js";
import protect from "../middleware/authMiddleware.js";
import { upload } from "../middleware/cloudinary.js";

// @route   GET /api/profile (Public)
router.get("/", getProfile);

// @route   PUT /api/profile (Private)
router.put("/", protect, updateProfile);

// @route   POST /api/profile/upload (Private)
router.post("/upload", protect, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image provided" });
  }
  res.status(200).json({ success: true, imageUrl: req.file.path });
});

export default router;
