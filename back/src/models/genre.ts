import mongoose from "mongoose";

const GenreSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const Genre = mongoose.model("Genre", GenreSchema);
