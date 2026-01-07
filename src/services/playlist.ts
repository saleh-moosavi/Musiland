"use server";
import apiClient from "@/configs/axios";
import { IGetAllPlaylistResponse, IPlaylistResponse } from "@/models/playlist";

export const getAllPlaylists = async (): Promise<IGetAllPlaylistResponse> => {
  const data = await apiClient.get<IGetAllPlaylistResponse>(`/playlist`);
  return data.data;
};

export const getPlaylist = async (id: string): Promise<IPlaylistResponse> => {
  const data = await apiClient.get<IPlaylistResponse>(`/playlist/${id}`);
  return data.data;
};

export const createPlaylist = async (
  name: string
): Promise<IPlaylistResponse> => {
  const data = await apiClient.post<IPlaylistResponse>(`/playlist`, {
    name,
  });
  return data.data;
};

export const editPlaylist = async (
  name: string,
  id: string
): Promise<IPlaylistResponse> => {
  const data = await apiClient.put<IPlaylistResponse>(`/playlist/`, {
    name,
    id,
  });
  return data.data;
};

export const deletePlaylist = async (
  id: string
): Promise<IPlaylistResponse> => {
  const data = await apiClient.delete<IPlaylistResponse>(`/playlist/${id}`);
  return data.data;
};
