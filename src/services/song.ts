"use server";
import { IGenre } from "./genre";
import { IAlbum } from "./album";
import { ISinger } from "./singer";
import { IPlaylist } from "./playlist";
import apiClient from "@/configs/axios";
import { SongFormData } from "@/app/admin/_components/SongForm";

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
  id: string;
  name: string;
  lyric: string;
  audioUrl: string;
  coverUrl: string;
  createdAt: string;
  likes: number;
  comments: string[];
  album: IAlbum;
  songs_genres: IGenre[];
  songs_playlists: IPlaylist[];
  singer: ISinger;
  updatedAt: string;
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
