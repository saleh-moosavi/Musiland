import { z } from "zod";
import { Schema, model, models } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin", "manager"], default: "user" },
    likedSongs: [{ type: Schema.Types.ObjectId, ref: "Song" }],
    comments: [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  },
  { timestamps: true }
);

export const UserModel = models.User ?? model("User", UserSchema);

// Form Schema
export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "More Than 6 Character"),
  role: z.enum(["user", "admin", "manager"] as const).catch("user"),

  likedSongs: z.array(z.string()).min(0).default([]),
  comments: z.array(z.string()).min(0).default([]),
});

export type UserFormData = z.infer<typeof userSchema>;

export interface IUser {
  id: string;
  username: string;
  email: string;
  likedSongs?: string[];
  name: string;
  role: "user" | "admin" | "manager";
  createdAt: string;
  updatedAt: string;
}

export interface IAuth {
  success: boolean;
  message?: string;
  data?: IUser;
}
export interface IGetAllAuth {
  success: boolean;
  message?: string;
  data?: IUser[];
}
