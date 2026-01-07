import { model, models, Schema } from "mongoose";

const AlbumSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const AlbumModel = models.Album ?? model("Album", AlbumSchema);

export interface IAlbum {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IAlbumResponse {
  success: boolean;
  data?: IAlbum;
  message?: string;
}

export interface IGetAllAlbumResponse {
  success: boolean;
  data?: IAlbum[];
  message?: string;
}
