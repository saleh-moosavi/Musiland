import apiClient from "@/configs/axios";

export const likeToggler = (userId: string, songId: string) =>
  apiClient.put("/likes", { userId, songId }).then((res) => res.data);

export const getUserLikes = (userId: string) =>
  apiClient.post("/likes", { userId }).then((res) => res.data);
