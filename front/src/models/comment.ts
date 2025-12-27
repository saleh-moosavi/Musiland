import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema(
  {
    description: { type: String },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    song: { type: mongoose.Schema.Types.ObjectId, ref: "Song" },
  },
  { timestamps: true }
);

export const CommentModel = mongoose.model("Comment", CommentSchema);
