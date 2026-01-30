import { ISong } from "./song";
import { IUser } from "./user";
import apiClient from "@/configs/axios";

export const getAllComments = async (): Promise<IGetAllCommentsResponse> => {
  const res = await apiClient.get<IGetAllCommentsResponse>(`/comment`);
  return res.data;
};

export const getSongComments = async (
  id: string,
): Promise<IGetAllCommentsResponse> => {
  const res = await apiClient.get<IGetAllCommentsResponse>(
    `/comment/song/${id}`,
  );
  return res.data;
};

export const getUserComments = async (
  id: string,
): Promise<IGetAllCommentsResponse> => {
  const res = await apiClient.get<IGetAllCommentsResponse>(
    `/comment/user/${id}`,
  );
  return res.data;
};

export const addComment = async (
  comment: string,
  userId: string,
  songId: string,
): Promise<ICommentResponse> => {
  const res = await apiClient.post<ICommentResponse>("/comment", {
    description: comment,
    user: userId,
    song: songId,
  });
  return res.data;
};

export const editComment = async (
  id: string,
  comment: string,
  userId: string,
  songId: string,
): Promise<ICommentResponse> => {
  const res = await apiClient.put<ICommentResponse>("/comment", {
    id,
    description: comment,
    user: userId,
    song: songId,
  });
  return res.data;
};

export const deleteComment = async (id: string): Promise<ICommentResponse> => {
  const res = await apiClient.delete<ICommentResponse>(`/comment/${id}`);
  return res.data;
};

/***************** Data Types *****************/
export interface IComment {
  _id: string;
  description: string;
  user:
    | IUser
    | {
        _id: string;
        name: string;
      };
  song:
    | ISong
    | {
        _id: string;
        name: string;
      };
  createdAt: string;
  updatedAt: string;
}

export interface ICommentResponse {
  success: boolean;
  data?: IComment;
  message?: string;
}

export interface IGetAllCommentsResponse {
  success: boolean;
  data?: IComment[];
  message?: string;
}
