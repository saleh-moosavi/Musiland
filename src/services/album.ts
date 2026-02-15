"use server";
import { apiClient } from "@/configs/apiConfig";
import { revalidatePath, revalidateTag } from "next/cache";

export const getAllAlbums = async (): Promise<IGetAllAlbumResponse> => {
  const data = await apiClient.get<IGetAllAlbumResponse>(`/album`, {
    next: { tags: ["album"], revalidate: 300 },
  });
  if (!data.success) {
    revalidateTag("album");
    revalidatePath("/albums");
  }
  return data;
};

export const getAlbum = async (id: string): Promise<IAlbumResponse> => {
  const data = await apiClient.get<IAlbumResponse>(`/album/${id}`, {
    next: { tags: [`album-${id}`], revalidate: 300 },
  });
  if (!data.success) {
    revalidateTag(`album-${id}`);
    revalidatePath(`/album/${id}`);
  }
  return data;
};

export const createAlbum = async (name: string): Promise<IAlbumResponse> => {
  const data = await apiClient.post<IAlbumResponse>(`/album`, {
    name,
  });
  if (data.success) {
    revalidateTag("album");
    revalidatePath("/albums");
  }
  return data;
};

export const editAlbum = async (
  name: string,
  id: string,
): Promise<IAlbumResponse> => {
  const data = await apiClient.put<IAlbumResponse>(`/album/`, {
    name,
    id,
  });
  if (data.success) {
    revalidateTag("album");
    revalidateTag(`album-${id}`);
    revalidatePath("/albums");
    revalidatePath(`/album/${id}`);
  }
  return data;
};

export const deleteAlbum = async (id: string): Promise<IAlbumResponse> => {
  const data = await apiClient.delete<IAlbumResponse>(`/album/${id}`);
  if (data.success) {
    revalidateTag("album");
    revalidateTag(`album-${id}`);
    revalidatePath("/albums");
  }
  return data;
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
