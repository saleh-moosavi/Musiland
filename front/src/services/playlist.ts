import apiClient from "@/configs/axios";

export const getAllPlaylists = async () => {
  const data = await apiClient.get(`/playlist`);
  return data;
};

export const getPlaylist = async (id: string) => {
  const data = await apiClient.get(`/playlist/${id}`);
  return data;
};

export const createPlaylist = async (name: string) => {
  const data = await apiClient.post(`/playlist`, {
    body: JSON.stringify({ name }),
  });

  return data;
};

export const editPlaylist = async (name: string, id: string) => {
  const data = await apiClient.put(`/playlist/`, {
    body: JSON.stringify({ name, id }),
  });

  return data;
};

export const deletePlaylist = async (id: string) => {
  const data = await apiClient.delete(`/playlist/${id}`, {
    method: "DELETE",
  });
  return data;
};
