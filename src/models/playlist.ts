import { model, models, Schema } from "mongoose";

const PlaylistSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const PlaylistModel =
  models.Playlist ?? model("Playlist", PlaylistSchema);

export interface IPlaylist {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IPlaylistResponse {
  success: boolean;
  data?: IPlaylist;
  message?: string;
}

export interface IGetAllPlaylistResponse {
  success: boolean;
  data?: IPlaylist[];
  message?: string;
}
