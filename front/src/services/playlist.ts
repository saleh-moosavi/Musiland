import apiClient from "@/configs/axios";

export const getAllPlaylists = () =>
  apiClient.get("/playlists").then((res) => res.data);
