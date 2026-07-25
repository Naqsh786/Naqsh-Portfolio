const mongoose = require("mongoose");

let isMongoConnected = false;

const connectDB = async () => {
  if (mongoose.connection.readyState >= 1) {
    isMongoConnected = true;
    return;
  }
  const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/naqsh_portfolio";
  try {
    const conn = await mongoose.connect(MONGO_URI);
    isMongoConnected = true;
    console.log(`🟢 Connected to MongoDB: ${conn.connection.host}`);
  } catch (error) {
    isMongoConnected = false;
    console.warn(`⚠️ MongoDB connection error: ${error.message}. App will run with in-memory fallback.`);
  }
};

const getIsConnected = () => isMongoConnected;

module.exports = { connectDB, getIsConnected };
