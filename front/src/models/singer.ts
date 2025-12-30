import { model, models, Schema } from "mongoose";

const SingerSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const SingerModel = models.singer || model("Singer", SingerSchema);
