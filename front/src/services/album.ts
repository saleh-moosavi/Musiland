import apiClient from "@/configs/axios";

export const getAlbums = () =>
  apiClient.get("/album").then((res) => res.data);
