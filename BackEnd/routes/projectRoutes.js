import express from "express";
const router = express.Router();
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";
import protect from "../middleware/authMiddleware.js";
import { upload } from "../middleware/cloudinary.js";

// Image upload route
router.post("/upload", protect, upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ success: false, message: "No image provided" });
  }
  res.status(200).json({ success: true, imageUrl: req.file.path });
});

router.route("/").get(getProjects).post(protect, createProject);
router
  .route("/:id")
  .get(getProject)
  .put(protect, updateProject)
  .delete(protect, deleteProject);

export default router;
