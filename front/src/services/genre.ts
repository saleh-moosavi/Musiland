import apiClient from "@/configs/axios";

export const getAllGenres = () =>
  apiClient.get("/genres").then((res) => res.data);
