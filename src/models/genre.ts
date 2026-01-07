import { model, models, Schema } from "mongoose";

const GenreSchema = new Schema(
  {
    name: { type: String },
  },
  { timestamps: true }
);

export const GenreModel = models.Genre ?? model("Genre", GenreSchema);

export interface IGenre {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IGenreResponse {
  success: boolean;
  data?: IGenre;
  message?: string;
}

export interface IGetAllGenreResponse {
  success: boolean;
  data?: IGenre[];
  message?: string;
}
