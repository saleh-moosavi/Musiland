"use server";
import { IGenre } from "./genre";
import { IAlbum } from "./album";
import { ISinger } from "./singer";
import { IPlaylist } from "./playlist";
import { apiClient } from "@/configs/apiConfig";
import { revalidatePath, revalidateTag } from "next/cache";
import { SongFormData } from "@/app/admin/_components/SongForm";

export const getAllSongs = async (
  query: string = "",
): Promise<ISongsResponse> => {
  const data = await apiClient.get<ISongsResponse>(`/song?${query}`, {
    next: { tags: ["songs"], revalidate: 300 },
  });
  if (!data.success) {
    revalidateTag("songs");
    revalidatePath("/songs");
  }
  return data;
};

export const getSong = async (id: string): Promise<ISongResponse> => {
  const data = await apiClient.get<ISongResponse>(`/song/${id}`, {
    next: { tags: [`song-${id}`], revalidate: 300 },
  });
  if (!data.success) {
    revalidateTag(`song-${id}`);
    revalidatePath(`/song/${id}`);
  }
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
  if (res.success) {
    revalidateTag("songs");
    revalidatePath("/songs");
  }
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
  if (res.success) {
    revalidateTag("songs");
    revalidateTag(`song-${id}`);
    revalidatePath("/songs");
    revalidatePath(`/song/${id}`);
  }
  return res;
};

export const deleteSong = async (id: string): Promise<ISongResponse> => {
  const res = await apiClient.delete<ISongResponse>(`/song/${id}`);
  if (res.success) {
    revalidateTag("songs");
    revalidateTag(`song-${id}`);
    revalidatePath("/songs");
    revalidatePath(`/song/${id}`);
  }
  return res;
};

/***************** Data Types *****************/
export interface ISong {
  id: string;
  name: string;
  lyric: string;
  audio_url: string;
  cover_url: string;
  likes: number;
  singer_id: string;
  album_id: string;
  created_at: string;
  updated_at: string;
  singer: ISinger;
  album: IAlbum;
  songs_genres: { genre: IGenre }[];
  songs_playlists: { playlist: IPlaylist }[];
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
