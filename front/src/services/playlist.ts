import apiClient from "@/configs/axios";

export const getAllPlaylists = () =>
  apiClient.get("/playlist").then((res) => res.data);
