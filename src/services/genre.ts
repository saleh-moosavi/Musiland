"use server";
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

export const createGenre = async (
  name: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.post<ApiResponse<IGeneralRes>>(`/genre`, {
    name,
  });
  return data.data;
};

export const editGenre = async (
  name: string,
  id: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.put<ApiResponse<IGeneralRes>>(`/genre/`, {
    name,
    id,
  });
  return data.data;
};

export const deleteGenre = async (
  id: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.delete<ApiResponse<IGeneralRes>>(`/genre/${id}`);
  return data.data;
};
