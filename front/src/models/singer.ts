import mongoose from "mongoose";

const SingerSchema = new mongoose.Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const SingerModel = mongoose.model("Singer", SingerSchema);
