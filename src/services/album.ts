import apiClient from "@/configs/axios";
import { ApiResponse, IGeneralRes } from "@/types/generalItems";

export const getAllAlbums = async (): Promise<ApiResponse<IGeneralRes[]>> => {
  const data = await apiClient.get<ApiResponse<IGeneralRes[]>>(`/album`);
  return data.data;
};

export const getAlbum = async (
  id: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.get<ApiResponse<IGeneralRes>>(`/album/${id}`);
  return data.data;
};

export const createAlbum = async (name: string) => {
  const data = await apiClient.post(`/album`, { name });
  return data;
};

export const editAlbum = async (name: string, id: string) => {
  const data = await apiClient.put(`/album/`, { name, id });
  return data;
};

export const deleteAlbum = async (id: string) => {
  const data = await apiClient.delete(`/album/${id}`);
  return data;
};
