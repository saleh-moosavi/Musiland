import { apiClient } from "@/configs/apiConfig";
import { ILikeResponse, IToggleLikeResponse } from "@/types";

export const toogleLike = async (
  userId: string,
  songId: string,
): Promise<IToggleLikeResponse> => {
  const res = await apiClient.post<IToggleLikeResponse>("/toggle-like", {
    userId,
    songId,
  });
  return res;
};

export const getUserLikes = async (userId: string): Promise<ILikeResponse> => {
  const res = await apiClient.post<ILikeResponse>("/user/liked-songs", {
    userId,
  });
  return res;
};
