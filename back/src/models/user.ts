import mongoose, { Schema, model, Document } from "mongoose";

// User Interface
interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "admin" | "user" | "manager";
  createdAt: Date;
  updatedAt: Date;
}

// User Schema
const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "manager"], default: "user" },
  },
  { timestamps: true }
);

export const User = model<IUser>("User", userSchema);
