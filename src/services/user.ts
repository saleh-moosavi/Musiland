"use server";
import apiClient from "@/configs/axios";

export const getAllUsers = async (): Promise<IGetAllUsersResponse> => {
  const res = await apiClient.get<IGetAllUsersResponse>("/user");
  return res.data;
};

export const getUser = async (id: string): Promise<IUserResponse> => {
  const res = await apiClient.get<IUserResponse>(`/user/${id}`);
  return res.data;
};

export const addUser = async (data: {
  name: string;
  password: string;
  email: string;
}): Promise<IAuthResponse> => {
  const res = await apiClient.post<IAuthResponse>("/user", data);
  return res.data;
};

export const editUser = async (
  id: string,
  data: {
    name: string;
    password: string;
    email: string;
  },
): Promise<IAuthResponse> => {
  const res = await apiClient.put<IAuthResponse>("/user", { data, id });
  return res.data;
};

export const deleteUser = async (id: string): Promise<IUserResponse> => {
  const res = await apiClient.delete<IUserResponse>(`user/${id}`);
  return res.data;
};

/***************** Data Types *****************/

export interface IAuth {
  id: string;
  name: string;
  email: string;
  role: "user" | "admin" | "manager";
}

export interface IUser extends IAuth {
  likedSongs?: string[];
  comments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface IUserResponse {
  success: boolean;
  message?: string;
  data?: IUser;
}

export interface IGetAllUsersResponse {
  success: boolean;
  message?: string;
  data?: IUser[];
}

export interface IAuthResponse {
  success: boolean;
  message?: string;
  data?: IAuth;
}
