"use server";
import apiClient from "@/configs/axios";

export const getAllGenres = async (): Promise<IGetAllGenreResponse> => {
  const data = await apiClient.get<IGetAllGenreResponse>(`/genre`);
  return data.data;
};

export const getGenre = async (id: string): Promise<IGenreResponse> => {
  const data = await apiClient.get<IGenreResponse>(`/genre/${id}`);
  return data.data;
};

export const createGenre = async (name: string): Promise<IGenreResponse> => {
  const data = await apiClient.post<IGenreResponse>(`/genre`, {
    name,
  });
  return data.data;
};

export const editGenre = async (
  name: string,
  id: string,
): Promise<IGenreResponse> => {
  const data = await apiClient.put<IGenreResponse>(`/genre/`, {
    name,
    id,
  });
  return data.data;
};

export const deleteGenre = async (id: string): Promise<IGenreResponse> => {
  const data = await apiClient.delete<IGenreResponse>(`/genre/${id}`);
  return data.data;
};

/***************** Data Types *****************/
export interface IGenre {
  _id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface IGenreResponse {
  success: boolean;
  data?: IGenre;
  message?: string;
}

export interface IGetAllGenreResponse {
  success: boolean;
  data?: IGenre[];
  message?: string;
}
