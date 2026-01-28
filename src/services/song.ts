import z from "zod";
import { IGenre } from "./genre";
import apiClient from "@/configs/axios";
import { IAlbum } from "@/models/album";
import { ISinger } from "./singer";
import { IPlaylist } from "./playlist";

export const getAllSongs = async (query?: string): Promise<ISongsResponse> => {
  const data = await apiClient.get<ISongsResponse>(`/song?${query}`);
  return data.data;
};

export const getSong = async (id: string): Promise<ISongResponse> => {
  const data = await apiClient.get<ISongResponse>(`/song/${id}`);
  return data.data;
};

export const createSong = async (
  data: SongFormData,
): Promise<ISongResponse> => {
  const res = await apiClient.post<ISongResponse>(`/song`, data);
  console.log(res);
  return res.data;
};

export const editSong = async (
  id: string,
  data: SongFormData,
): Promise<ISongResponse> => {
  const res = await apiClient.put<ISongResponse>(`/song`, { id, data });
  return res.data;
};

export const deleteSong = async (id: string): Promise<ISongResponse> => {
  const res = await apiClient.delete<ISongResponse>(`/song/${id}`);
  return res.data;
};
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
