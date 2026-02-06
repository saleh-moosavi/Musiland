"use server";
import { apiClient } from "@/configs/apiConfig";
import { revalidatePath, revalidateTag } from "next/cache";

export const getAllGenres = async (): Promise<IGetAllGenreResponse> => {
  const data = await apiClient.get<IGetAllGenreResponse>(`/genre`, {
    next: { tags: ["genre"], revalidate: 300 },
  });
  return data;
};

export const getGenre = async (id: string): Promise<IGenreResponse> => {
  const data = await apiClient.get<IGenreResponse>(`/genre/${id}`, {
    next: { tags: [`genre-${id}`], revalidate: 300 },
  });
  return data;
};

export const createGenre = async (name: string): Promise<IGenreResponse> => {
  const data = await apiClient.post<IGenreResponse>(`/genre`, {
    name,
  });
  if (data.success) {
    revalidateTag("genre");
    revalidatePath("/genres");
  }
  return data;
};

export const editGenre = async (
  name: string,
  id: string,
): Promise<IGenreResponse> => {
  const data = await apiClient.put<IGenreResponse>(`/genre/`, {
    name,
    id,
  });
  if (data.success) {
    revalidateTag("genre");
    revalidateTag(`genre-${id}`);
    revalidatePath("/genres");
    revalidatePath(`/genre/${id}`);
  }
  return data;
};

export const deleteGenre = async (id: string): Promise<IGenreResponse> => {
  const data = await apiClient.delete<IGenreResponse>(`/genre/${id}`);
  if (data.success) {
    revalidateTag("genre");
    revalidateTag(`genre-${id}`);
    revalidatePath("/genres");
  }
  return data;
};

/***************** Data Types *****************/
export interface IGenre {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
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
