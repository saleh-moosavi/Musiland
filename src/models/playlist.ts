import { model, models, Schema } from "mongoose";

const PlaylistSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const PlaylistModel =
  models.Playlist ?? model("Playlist", PlaylistSchema);
