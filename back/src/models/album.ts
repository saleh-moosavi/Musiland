import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const Album = mongoose.model("Album", AlbumSchema);
