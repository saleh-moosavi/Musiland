import apiClient from "@/configs/axios";

export const getAllGenres = async () => {
  const data = await apiClient.get(`/genre`);
  return data;
};

export const getGenre = async (id: string) => {
  const data = await apiClient.get(`/genre/${id}`);
  return data;
};

export const createGenre = async (name: string) => {
  const data = await apiClient.post(`/genre`, { name });
  return data;
};

export const editGenre = async (name: string, id: string) => {
  const data = await apiClient.put(`/genre/`, { name, id });
  return data;
};

export const deleteGenre = async (id: string) => {
  const data = await apiClient.delete(`/genre/${id}`);
  return data;
};
