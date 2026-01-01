import apiClient from "@/configs/axios";

export const getAllComments = async () => {
  const res = await apiClient.get(`/comment`);
  return res;
};

export const getSongComments = async (id: string) => {
  const res = await apiClient.get(`/comment/song/${id}`);
  return res;
};

export const getUserComments = async (id: string) => {
  const res = await apiClient.get(`/comment/user/${id}`);
  return res;
};

export const addComment = async (
  comment: string,
  userId: string,
  songId: string
) => {
  const res = await apiClient.post("/comment", {
    description: comment,
    user: userId,
    song: songId,
  });
  return res;
};

export const editComment = async (
  commentId: string,
  comment: string,
  userId: string,
  songId: string
) => {
  const res = await apiClient.put("/comment", {
    id: commentId,
    description: comment,
    user: userId,
    song: songId,
  });
  return res;
};

export const deleteComment = async (id: string) => {
  const res = await apiClient.delete(`/comment/${id}`);
  return res;
};
