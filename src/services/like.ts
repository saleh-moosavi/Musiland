"use server";
import { ISongsResponse } from "./song";
import { apiClient } from "@/configs/apiConfig";
import { revalidatePath, revalidateTag } from "next/cache";

// Get user's liked songs
export const getUserLikedSongs = async (
  userId: string,
  page?: number,
  limit?: number,
): Promise<ISongsResponse> => {
  const params = new URLSearchParams();
  params.append("userId", userId);
  if (page) params.append("page", page.toString());
  if (limit) params.append("limit", limit.toString());

  const data = await apiClient.get<ISongsResponse>(
    `/user-liked-songs?${params.toString()}`,
    {
      next: { tags: [`liked-songs-${userId}`], revalidate: 60 },
    },
  );
  return data;
};

// Toggle song like
export const toggleSongLike = async (
  userId: string,
  songId: string,
): Promise<IToggleLikeResponse> => {
  const data = await apiClient.post<IToggleLikeResponse>(`/songs/like`, {
    userId,
    songId,
  });

  if (data.success) {
    // Revalidate relevant paths and tags
    revalidateTag(`liked-songs-${userId}`);
    revalidateTag(`like-status-${songId}-${userId}`);
    revalidateTag(`song-${songId}`);
    revalidatePath(`/songs/${songId}`);
    revalidatePath("/liked-songs");
  }

  return data;
};

/***************** Data Types *****************/
export interface IToggleLikeResponse {
  success: boolean;
  data?: {
    action: "liked" | "unliked";
    likes: number;
  };
  message?: string;
}
