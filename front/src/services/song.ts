import apiClient from "@/configs/axios";
import { GetSong, SongFormData } from "@/types/song";

export const getAllSongs = async (query?: string): Promise<GetSong[]> => {
  const data = await apiClient.get(`/song?${query}`);
  return data.data.songs;
};

export const getSong = async (id: string): Promise<GetSong> => {
  const data = await apiClient.get(`/song/${id}`);
  return data.data.song;
};

export const addSong = async (data: SongFormData) => {
  const res = await apiClient.post(`/song`, {
    body: JSON.stringify({ data }),
  });
  return res.data;
};

export const editSong = async (id: string, data: SongFormData) => {
  const res = await apiClient.put(`/song`, {
    body: JSON.stringify({ data, id }),
  });
  return res.data;
};

export const deleteSong = async (id: string) => {
  const res = await apiClient.delete(`/song/${id}`);
  return res.data;
};
