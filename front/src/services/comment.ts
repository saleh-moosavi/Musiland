import apiClient from "@/configs/axios";
import { getComment, CommentByUserId } from "@/types/comment";

export const getComments = (id: string): Promise<getComment> =>
  apiClient.get(`/comment/${id}`).then((res) => res.data);

export const addComment = (
  data: { comment: string },
  userId: string | null,
  songId: string
) =>
  apiClient
    .post("/comment", {
      description: data.comment,
      user: userId,
      song: songId,
    })
    .then((res) => res.data);

export const getUserComments = (userId: string): Promise<CommentByUserId[]> =>
  apiClient.get(`/comment/user/${userId}`).then((res) => res.data.data);

export const deleteComment = (id: string) =>
  apiClient.delete(`/comment/${id}`).then((res) => res.data);
