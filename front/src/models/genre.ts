import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const GenreModel = mongoose.model("Genre", GenreSchema);
