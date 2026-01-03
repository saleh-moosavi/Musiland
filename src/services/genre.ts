import apiClient from "@/configs/axios";
import { ApiResponse, IGeneralRes } from "@/types/generalItems";

export const getAllGenres = async (): Promise<ApiResponse<IGeneralRes[]>> => {
  const data = await apiClient.get<ApiResponse<IGeneralRes[]>>(`/genre`);
  return data.data;
};

export const getGenre = async (
  id: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.get<ApiResponse<IGeneralRes>>(`/genre/${id}`);
  return data.data;
};

export const createGenre = async (name: string) => {
  const data = await apiClient.post(`/genre`, { name });
  return data;
};

export const editGenre = async (name: string, id: string) => {
  const data = await apiClient.put(`/genre/`, { name, id });
  return data;
};

export const deleteGenre = async (id: string) => {
  const data = await apiClient.delete(`/genre/${id}`);
  return data;
};
