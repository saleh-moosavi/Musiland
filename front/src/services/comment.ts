import apiClient from "@/configs/axios";
import { getComment, CommentByUserId } from "@/types/comment";

export const getComments = (id: string): Promise<getComment> =>
  apiClient.get(`/comments/${id}`).then((res) => res.data);

export const addComment = (
  data: { comment: string },
  userId: string | null,
  songId: string
) =>
  apiClient
    .post("/comments", {
      description: data.comment,
      user: userId,
      song: songId,
    })
    .then((res) => res.data);

export const getUserComments = (userId: string): Promise<CommentByUserId[]> =>
  apiClient.get(`/comments/user/${userId}`).then((res) => res.data.data);

export const deleteComment = (id: string) =>
  apiClient.delete(`/comments/${id}`).then((res) => res.data);
