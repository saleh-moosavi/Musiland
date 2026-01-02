import { model, models, Schema } from "mongoose";

const GenreSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const GenreModel = models.Genre ?? model("Genre", GenreSchema);
