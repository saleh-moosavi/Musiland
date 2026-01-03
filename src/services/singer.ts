import apiClient from "@/configs/axios";
import { ApiResponse, IGeneralRes } from "@/types/generalItems";

export const getAllSingers = async (): Promise<ApiResponse<IGeneralRes[]>> => {
  const data = await apiClient.get<ApiResponse<IGeneralRes[]>>(`/singer`);
  return data.data;
};

export const getSinger = async (
  id: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.get<ApiResponse<IGeneralRes>>(`/singer/${id}`);
  return data.data;
};

export const createSinger = async (
  name: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.post<ApiResponse<IGeneralRes>>(`/singer`, {
    name,
  });
  return data.data;
};

export const editSinger = async (
  name: string,
  id: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.put<ApiResponse<IGeneralRes>>(`/singer/`, {
    name,
    id,
  });
  return data.data;
};

export const deleteSinger = async (
  id: string
): Promise<ApiResponse<IGeneralRes>> => {
  const data = await apiClient.delete<ApiResponse<IGeneralRes>>(
    `/singer/${id}`
  );
  return data.data;
};
