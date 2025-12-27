import mongoose from "mongoose";

const AlbumSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const AlbumModel = mongoose.model("Album", AlbumSchema);
