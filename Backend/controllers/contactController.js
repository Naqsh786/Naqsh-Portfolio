const Message = require("../models/Message");
const { getIsConnected } = require("../config/db");

let memoryMessages = [];

// Handle POST /api/contact
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields (Name, Email, Message)."
      });
    }

    if (getIsConnected()) {
      const newMessage = await Message.create({
        name,
        email,
        subject: subject || "Portfolio Inquiry",
        message
      });
      return res.status(201).json({
        success: true,
        message: "Your message has been sent successfully!",
        data: newMessage
      });
    } else {
      const fallbackMsg = {
        _id: Date.now().toString(),
        name,
        email,
        subject: subject || "Portfolio Inquiry",
        message,
        read: false,
        createdAt: new Date()
      };
      memoryMessages.unshift(fallbackMsg);
      return res.status(201).json({
        success: true,
        message: "Your message has been sent successfully! (InMemory)",
        data: fallbackMsg
      });
    }
  } catch (error) {
    console.error("Error submitting contact:", error);
    res.status(500).json({
      success: false,
      message: "Server error while sending message. Please try again later."
    });
  }
};

const getMemoryMessages = () => memoryMessages;
const setMemoryMessages = (newArr) => { memoryMessages = newArr; };

module.exports = { submitContact, getMemoryMessages, setMemoryMessages };
