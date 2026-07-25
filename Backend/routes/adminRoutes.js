const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  adminLogin,
  getMessages,
  toggleReadStatus,
  deleteMessage,
  getStats
} = require("../controllers/adminController");

router.post("/login", adminLogin);
router.get("/messages", authMiddleware, getMessages);
router.patch("/messages/:id/read", authMiddleware, toggleReadStatus);
router.delete("/messages/:id", authMiddleware, deleteMessage);
router.get("/stats", authMiddleware, getStats);

module.exports = router;
