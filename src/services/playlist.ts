"use server";
import { apiClient } from "@/configs/apiConfig";
import { revalidatePath, revalidateTag } from "next/cache";

export const getAllPlaylists = async (): Promise<IGetAllPlaylistResponse> => {
  const data = await apiClient.get<IGetAllPlaylistResponse>(`/playlist`, {
    next: { tags: ["playlist"], revalidate: 300 },
  });
  if (!data.success) {
    revalidateTag("playlist");
    revalidatePath("/playlists");
  }
  return data;
};

export const getPlaylist = async (id: string): Promise<IPlaylistResponse> => {
  const data = await apiClient.get<IPlaylistResponse>(`/playlist/${id}`, {
    next: { tags: [`playlist-${id}`], revalidate: 300 },
  });
  if (!data.success) {
    revalidateTag(`playlist-${id}`);
    revalidatePath(`/playlist/${id}`);
  }
  return data;
};

export const createPlaylist = async (
  name: string,
): Promise<IPlaylistResponse> => {
  const data = await apiClient.post<IPlaylistResponse>(`/playlist`, {
    name,
  });
  if (data.success) {
    revalidateTag("playlist");
    revalidatePath("/playlists");
  }
  return data;
};

export const editPlaylist = async (
  name: string,
  id: string,
): Promise<IPlaylistResponse> => {
  const data = await apiClient.put<IPlaylistResponse>(`/playlist/`, {
    name,
    id,
  });
  if (data.success) {
    revalidateTag("playlist");
    revalidateTag(`playlist-${id}`);
    revalidatePath("/playlists");
    revalidatePath(`/playlist/${id}`);
  }
  return data;
};

export const deletePlaylist = async (
  id: string,
): Promise<IPlaylistResponse> => {
  const data = await apiClient.delete<IPlaylistResponse>(`/playlist/${id}`);
  if (data.success) {
    revalidateTag("playlist");
    revalidateTag(`playlist-${id}`);
    revalidatePath("/playlists");
  }
  return data;
};

/***************** Data Types *****************/
export interface IPlaylist {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPlaylistResponse {
  success: boolean;
  data?: IPlaylist;
  message?: string;
}

export interface IGetAllPlaylistResponse {
  success: boolean;
  data?: IPlaylist[];
  message?: string;
}
