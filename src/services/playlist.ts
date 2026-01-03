"use server";
import apiClient from "@/configs/axios";
import { ApiResponse, IGeneralRes } from "@/types/generalItems";

export const getAllPlaylists = async (): Promise<
  ApiResponse<IGeneralRes[]>
> => {
  const data = await apiClient.get<ApiResponse<IGeneralRes[]>>(`/playlist`);
  return data.data;
};

export const getPlaylist = async (
  id: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.get<ApiResponse<IGeneralRes>>(`/playlist/${id}`);
  return data.data;
};

export const createPlaylist = async (
  name: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.post<ApiResponse<IGeneralRes>>(`/playlist`, {
    name,
  });
  return data.data;
};

export const editPlaylist = async (
  name: string,
  id: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.put<ApiResponse<IGeneralRes>>(`/playlist/`, {
    name,
    id,
  });
  return data.data;
};

export const deletePlaylist = async (
  id: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.delete<ApiResponse<IGeneralRes>>(
    `/playlist/${id}`
  );
  return data.data;
};
