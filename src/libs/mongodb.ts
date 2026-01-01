import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("✅ MongoDB connected successfully!");
  } catch (error) {
    console.error("❌ Connection error:", error);
  }
}

export async function disConnectDB() {
  await mongoose.disconnect();
}
