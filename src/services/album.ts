"use server";
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

export const createAlbum = async (
  name: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.post<ApiResponse<IGeneralRes>>(`/album`, {
    name,
  });
  return data.data;
};

export const editAlbum = async (
  name: string,
  id: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.put<ApiResponse<IGeneralRes>>(`/album/`, {
    name,
    id,
  });
  return data.data;
};

export const deleteAlbum = async (
  id: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.delete<ApiResponse<IGeneralRes>>(`/album/${id}`);
  return data.data;
};
