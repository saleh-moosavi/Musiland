import apiClient from "@/configs/axios";
import { GetSong, SongFormData } from "@/types/song";

export const getSong = (id: string): Promise<GetSong> =>
  apiClient.get(`/song/${id}`).then((res) => res.data.song);

export const getAllSongs = (query: string): Promise<GetSong[]> =>
  apiClient.get(`/song?${query}`).then((res) => res.data.songs);

export const addEditSong = async (
  mode: "add" | "edit",
  songId: string | null,
  data: SongFormData
) => {
  const url = mode === "add" ? "/song" : `/song/${songId}`;
  const method = mode === "add" ? "post" : "put";

  return apiClient[method](url, data).then((res) => res.data);
};
