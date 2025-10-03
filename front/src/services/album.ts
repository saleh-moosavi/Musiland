import apiClient from "@/configs/axios";

export const getAlbums = () => apiClient.get("/albums");
