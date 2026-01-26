import z from "zod";
import { IAlbum } from "./album";
import { IGenre } from "@/services/genre";
import { ISinger } from "./singer";
import { IPlaylist } from "./playlist";
import { model, models, Schema } from "mongoose";

const SongSchema = new Schema(
  {
    name: { type: String, required: true },
    likes: { type: Number, default: 0 },
    lyric: { type: String },
    audioUrl: { type: String, required: true },
    coverUrl: { type: String, required: true },
    singer: { type: Schema.Types.ObjectId, ref: "Singer", required: true },
    album: { type: Schema.Types.ObjectId, ref: "Album", required: true },
    genre: [{ type: Schema.Types.ObjectId, ref: "Genre" }],
    playlist: [{ type: Schema.Types.ObjectId, ref: "Playlist" }],
  },
  { timestamps: true }
);

export const SongModel = models.Song ?? model("Song", SongSchema);

/***************** Data Types *****************/
export interface ISong {
  _id: string;
  name: string;
  lyric: string;
  audioUrl: string;
  coverUrl: string;
  createdAt: string;
  likes: number;
  comments: string[];
  album: IAlbum;
  genre: IGenre[];
  playlist: IPlaylist[];
  singer: ISinger;
  updatedAt: string;
  __v: number;
}

export interface ISongResponse {
  success: boolean;
  data?: ISong;
  message?: string;
}
export interface ISongsResponse {
  success: boolean;
  data?: ISong[];
  message?: string;
}

export type IMode = "add" | "edit";
/***************** Zod Schema *****************/
export const addSongSchema = z.object({
  name: z.string().min(1, "Song name is required"),
  lyric: z.string().optional(),
  audioUrl: z.string().url("Url Must Fill Currectly"),
  coverUrl: z.string().url("Url Must Fill Currectly"),
  singer: z.string().min(1, "Select Singer"),
  album: z.string().min(1, "Select Album"),
  genre: z.array(z.string()).min(1, "Select Genre"),
  playlist: z.array(z.string()).min(1, "Select Playlist"),
});

export type SongFormData = z.infer<typeof addSongSchema>;
