import mongoose from "mongoose";

const PlaylistSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const Playlist = mongoose.model("Playlist", PlaylistSchema);
