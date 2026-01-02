import { model, models, Schema } from "mongoose";

const AlbumSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const AlbumModel = models.Album ?? model("Album", AlbumSchema);
