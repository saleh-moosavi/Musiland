import mongoose from "mongoose";
import type { Express } from "express";

export const connectToDB = (app: Express) => {
  if (!process.env.DB_URI) {
    throw new Error("DB_URI is not defined in .env file");
  }
  mongoose
    .connect(process.env.DB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    } as mongoose.ConnectOptions)
    .then(() => {
      console.log("✅ MongoDB Connected");
      app.listen(process.env.PORT || 3000, () => {
        console.log(
          `Running at => http://localhost:${process.env.PORT || 3000}`
        );
      });
    })
    .catch((err: Error) => console.error("❌ Connecting Error:", err));
};
