import apiClient from "@/configs/axios";

export const getAlbums = () =>
  apiClient.get("/albums").then((res) => res.data);
