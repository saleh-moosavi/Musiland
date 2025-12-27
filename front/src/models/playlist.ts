import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const PlaylistModel = mongoose.model("Playlist", PlaylistSchema);
