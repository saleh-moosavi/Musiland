"use server";
import { IGenre } from "./genre";
import { IAlbum } from "./album";
import { ISinger } from "./singer";
import { IPlaylist } from "./playlist";
import { apiClient } from "@/configs/apiConfig";
import { SongFormData } from "@/app/admin/_components/SongForm";

export const getAllSongs = async (
  query: string = "",
): Promise<ISongsResponse> => {
  const data = await apiClient.get<ISongsResponse>(`/song?${query}`);
  return data;
};

export const getSong = async (id: string): Promise<ISongResponse> => {
  const data = await apiClient.get<ISongResponse>(`/song/${id}`);
  return data;
};

export const createSong = async (
  data: SongFormData,
): Promise<ISongResponse> => {
  const res = await apiClient.post<ISongResponse>(`/song`, {
    name: data.name,
    audioUrl: data.audioUrl,
    coverUrl: data.coverUrl,
    singer: data.singer,
    album: data.album,
    genre: data.genre.join(","),
    playlist: data.playlist.join(","),
  });
  console.log(res);
  return res;
};

export const editSong = async (
  id: string,
  data: SongFormData,
): Promise<ISongResponse> => {
  const res = await apiClient.put<ISongResponse>(`/song`, {
    id,
    name: data.name,
    audioUrl: data.audioUrl,
    coverUrl: data.coverUrl,
    singer: data.singer,
    album: data.album,
    genre: data.genre.join(","),
    playlist: data.playlist.join(","),
  });
  return res;
};

export const deleteSong = async (id: string): Promise<ISongResponse> => {
  const res = await apiClient.delete<ISongResponse>(`/song/${id}`);
  return res;
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
