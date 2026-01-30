"use server";
import apiClient from "@/configs/axios";

export const getAllSingers = async (): Promise<IGetAllSingerResponse> => {
  const data = await apiClient.get<IGetAllSingerResponse>(`/singer`);
  return data.data;
};

export const getSinger = async (id: string): Promise<ISingerResponse> => {
  const data = await apiClient.get<ISingerResponse>(`/singer/${id}`);
  return data.data;
};

export const createSinger = async (name: string): Promise<ISingerResponse> => {
  const data = await apiClient.post<ISingerResponse>(`/singer`, {
    name,
  });
  return data.data;
};

export const editSinger = async (
  name: string,
  id: string,
): Promise<ISingerResponse> => {
  const data = await apiClient.put<ISingerResponse>(`/singer/`, {
    name,
    id,
  });
  return data.data;
};

export const deleteSinger = async (id: string): Promise<ISingerResponse> => {
  const data = await apiClient.delete<ISingerResponse>(`/singer/${id}`);
  return data.data;
};

/***************** Data Types *****************/
export interface ISinger {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ISingerResponse {
  success: boolean;
  data?: ISinger;
  message?: string;
}

export interface IGetAllSingerResponse {
  success: boolean;
  data?: ISinger[];
  message?: string;
}
