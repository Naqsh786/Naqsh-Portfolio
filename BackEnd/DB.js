import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Caching connection for Vercel/Serverless cold starts
let cached = globalThis.mongoose;

if (!cached) {
  cached = globalThis.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: true,
      dbName: "naqsh-portfolio",
    };

    const mongoUri = process.env.DATABASE || process.env.MONGO_URI;
    if (!mongoUri) {
      throw new Error("DATABASE or MONGO_URI is not defined in .env file");
    }

    cached.promise = mongoose.connect(mongoUri, opts).then((mongoose) => {
      console.log(`✅ Connected to DB: ${mongoose.connection.name}`);
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    console.error("❌ MongoDB Connection Error:", e.message);
    throw e;
  }

  return cached.conn;
}

export default connectDB;
