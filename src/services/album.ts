"use server";
import apiClient from "@/configs/axios";
import { IAlbumResponse, IGetAllAlbumResponse } from "@/models/album";

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
  id: string
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
