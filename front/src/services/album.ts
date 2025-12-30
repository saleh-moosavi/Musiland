import apiClient from "@/configs/axios";

export const getAllAlbums = async () => {
  const data = await apiClient.get(`/album`);
  return data;
};

export const getAlbum = async (id: string) => {
  const data = await apiClient.get(`/album/${id}`);
  return data;
};

export const createAlbum = async (name: string) => {
  const data = await apiClient.post(`/album`, {
    body: JSON.stringify({ name }),
  });

  return data;
};

export const editAlbum = async (name: string, id: string) => {
  const data = await apiClient.put(`/album/`, {
    body: JSON.stringify({ name, id }),
  });

  return data;
};

export const deleteAlbum = async (id: string) => {
  const data = await apiClient.delete(`/album/${id}`, {
    method: "DELETE",
  });
  return data;
};
