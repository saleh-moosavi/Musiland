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
