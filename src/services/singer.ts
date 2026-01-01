import apiClient from "@/configs/axios";

export const getAllSingers = async () => {
  const data = await apiClient.get(`/singer`);
  return data;
};

export const getSinger = async (id: string) => {
  const data = await apiClient.get(`/singer/${id}`);
  return data;
};

export const createSinger = async (name: string) => {
  const data = await apiClient.post(`/singer`, { name });
  return data;
};

export const editSinger = async (name: string, id: string) => {
  const data = await apiClient.put(`/singer/`, { name, id });
  return data;
};

export const deleteSinger = async (id: string) => {
  const data = await apiClient.delete(`/singer/${id}`);
  return data;
};
