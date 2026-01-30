"use server";
import apiClient from "@/configs/axios";

export const getAllAlbums = async (): Promise<IGetAllAlbumResponse> => {
  const data = await apiClient.get<IGetAllAlbumResponse>(`/album`);
  return data.data;
};

export const getAlbum = async (id: string): Promise<IAlbumResponse> => {
  const data = await apiClient.get<IAlbumResponse>(`/album/${id}`);
  return data.data;
};

export const createAlbum = async (name: string): Promise<IAlbumResponse> => {
  const data = await apiClient.post<IAlbumResponse>(`/album`, {
    name,
  });
  return data.data;
};

export const editAlbum = async (
  name: string,
  id: string,
): Promise<IAlbumResponse> => {
  const data = await apiClient.put<IAlbumResponse>(`/album/`, {
    name,
    id,
  });
  return data.data;
};

export const deleteAlbum = async (id: string): Promise<IAlbumResponse> => {
  const data = await apiClient.delete<IAlbumResponse>(`/album/${id}`);
  return data.data;
};

/***************** Data Types *****************/
export interface IAlbum {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IAlbumResponse {
  success: boolean;
  data?: IAlbum;
  message?: string;
}

export interface IGetAllAlbumResponse {
  success: boolean;
  data?: IAlbum[];
  message?: string;
}
