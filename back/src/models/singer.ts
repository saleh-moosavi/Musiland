import mongoose from "mongoose";

const SingerSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const Singer = mongoose.model("Singer", SingerSchema);
