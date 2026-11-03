const jwt = require("jsonwebtoken");
const Message = require("../models/Message");
const { getIsConnected } = require("../config/db");
const { getMemoryMessages, setMemoryMessages } = require("./contactController");

// Admin Login
const adminLogin = (req, res) => {
  const rawTarget = process.env.ADMIN_PASSWORD;
  const JWT_SECRET = process.env.JWT_SECRET;

  if (!rawTarget || !JWT_SECRET || !rawTarget.trim() || !JWT_SECRET.trim()) {
    console.error("System Error: ADMIN_PASSWORD or JWT_SECRET environment variables are missing.");
    return res.status(500).json({
      success: false,
      message: "Server configuration error"
    });
  }

  const { password } = req.body;
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Password is required"
    });
  }

  // Clean surrounding quotes or whitespace if present in .env
  const targetPassword = rawTarget.replace(/^["']|["']$/g, "").trim();
  const cleanInput = String(password).trim();
  const isMatch = cleanInput === targetPassword;

  if (isMatch) {
    const token = jwt.sign({ role: "admin" }, JWT_SECRET.trim(), { expiresIn: "24h" });
    return res.json({
      success: true,
      message: "Login successful",
      token
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Invalid admin password"
    });
  }
};

// Get All Messages
const getMessages = async (req, res) => {
  try {
    if (getIsConnected()) {
      const messages = await Message.find().sort({ createdAt: -1 });
      return res.json({ success: true, count: messages.length, data: messages });
    } else {
      const memoryMsgs = getMemoryMessages();
      return res.json({ success: true, count: memoryMsgs.length, data: memoryMsgs });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch messages" });
  }
};

// Toggle Read Status
const toggleReadStatus = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      const msg = await Message.findById(id);
      if (!msg) {
        return res.status(404).json({ success: false, message: "Message not found" });
      }
      msg.read = !msg.read;
      await msg.save();
      return res.json({ success: true, message: "Status updated", data: msg });
    } else {
      const memoryMsgs = getMemoryMessages();
      const msg = memoryMsgs.find((m) => m._id === id);
      if (!msg) {
        return res.status(404).json({ success: false, message: "Message not found" });
      }
      msg.read = !msg.read;
      return res.json({ success: true, message: "Status updated", data: msg });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating status" });
  }
};

// Delete Message
const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;

    if (getIsConnected()) {
      await Message.findByIdAndDelete(id);
      return res.json({ success: true, message: "Message deleted successfully" });
    } else {
      const memoryMsgs = getMemoryMessages().filter((m) => m._id !== id);
      setMemoryMessages(memoryMsgs);
      return res.json({ success: true, message: "Message deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete message" });
  }
};

// Dashboard Stats
const getStats = async (req, res) => {
  try {
    if (getIsConnected()) {
      const total = await Message.countDocuments();
      const unread = await Message.countDocuments({ read: false });
      return res.json({ success: true, data: { total, unread } });
    } else {
      const memoryMsgs = getMemoryMessages();
      const total = memoryMsgs.length;
      const unread = memoryMsgs.filter((m) => !m.read).length;
      return res.json({ success: true, data: { total, unread } });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to load stats" });
  }
};

module.exports = {
  adminLogin,
  getMessages,
  toggleReadStatus,
  deleteMessage,
  getStats
};
