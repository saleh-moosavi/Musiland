"use server";
import { apiClient } from "@/configs/apiConfig";
import { revalidatePath, revalidateTag } from "next/cache";

export const getAllSingers = async (): Promise<IGetAllSingerResponse> => {
  const data = await apiClient.get<IGetAllSingerResponse>(`/singer`, {
    next: { tags: ["singer"], revalidate: 300 },
  });
  return data;
};

export const getSinger = async (id: string): Promise<ISingerResponse> => {
  const data = await apiClient.get<ISingerResponse>(`/singer/${id}`, {
    next: { tags: [`singer-${id}`], revalidate: 300 },
  });
  return data;
};

export const createSinger = async (name: string): Promise<ISingerResponse> => {
  const data = await apiClient.post<ISingerResponse>(`/singer`, {
    name,
  });
  if (data.success) {
    revalidateTag("singer");
    revalidatePath("/singers");
  }
  return data;
};

export const editSinger = async (
  name: string,
  id: string,
): Promise<ISingerResponse> => {
  const data = await apiClient.put<ISingerResponse>(`/singer/`, {
    name,
    id,
  });
  if (data.success) {
    revalidateTag("singer");
    revalidateTag(`singer-${id}`);
    revalidatePath("/singers");
    revalidatePath(`/singer/${id}`);
  }
  return data;
};

export const deleteSinger = async (id: string): Promise<ISingerResponse> => {
  const data = await apiClient.delete<ISingerResponse>(`/singer/${id}`);
  if (data.success) {
    revalidateTag("singer");
    revalidateTag(`singer-${id}`);
    revalidatePath("/singers");
  }
  return data;
};

/***************** Data Types *****************/
export interface ISinger {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
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
