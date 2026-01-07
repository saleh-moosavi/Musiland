"use server";
import apiClient from "@/configs/axios";
import { ISongResponse, ISongsResponse, SongFormData } from "@/models/song";

export const getAllSongs = async (query?: string): Promise<ISongsResponse> => {
  const data = await apiClient.get<ISongsResponse>(`/song?${query}`);
  return data.data;
};

export const getSong = async (id: string): Promise<ISongResponse> => {
  const data = await apiClient.get<ISongResponse>(`/song/${id}`);
  return data.data;
};

export const createSong = async (
  data: SongFormData
): Promise<ISongResponse> => {
  const res = await apiClient.post<ISongResponse>(`/song`, data);
  console.log(res);
  return res.data;
};

export const editSong = async (
  id: string,
  data: SongFormData
): Promise<ISongResponse> => {
  const res = await apiClient.put<ISongResponse>(`/song`, { id, data });
  return res.data;
};

export const deleteSong = async (id: string): Promise<ISongResponse> => {
  const res = await apiClient.delete<ISongResponse>(`/song/${id}`);
  return res.data;
};
