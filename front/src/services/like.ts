import apiClient from "@/configs/axios";

export const likeToggler = async (userId: string, songId: string) => {
  const res = await apiClient.post("/likes", { userId, songId });
  return res;
};

export const getUserLikes = async (userId: string) => {
  const res = await apiClient.get(`/likes${userId}`);
  return res;
};
