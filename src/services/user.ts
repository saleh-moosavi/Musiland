"use server";
import { apiClient } from "@/configs/apiConfig";
import { revalidatePath, revalidateTag } from "next/cache";

export const getAllUsers = async (): Promise<IGetAllUsersResponse> => {
  const data = await apiClient.get<IGetAllUsersResponse>("/user", {
    next: { tags: ["user"], revalidate: 300 },
  });
  return data;
};

export const getUser = async (id: string): Promise<IUserResponse> => {
  const data = await apiClient.get<IUserResponse>(`/user/${id}`, {
    next: { tags: [`user-${id}`], revalidate: 300 },
  });
  return data;
};

export const addUser = async (user: {
  name: string;
  password: string;
  email: string;
}): Promise<IAuthResponse> => {
  const data = await apiClient.post<IAuthResponse>("/user", user);
  if (data.success) {
    revalidateTag("user");
    revalidatePath("/users");
  }
  return data;
};

export const editUser = async (
  id: string,
  user: {
    name: string;
    password: string;
    email: string;
  },
): Promise<IAuthResponse> => {
  const data = await apiClient.put<IAuthResponse>("/user", { ...user, id });
  if (data.success) {
    revalidateTag("user");
    revalidateTag(`user-${id}`);
    revalidatePath("/users");
    revalidatePath(`/user/${id}`);
  }
  return data;
};

export const deleteUser = async (id: string): Promise<IUserResponse> => {
  const data = await apiClient.delete<IUserResponse>(`user/${id}`);
  if (data.success) {
    revalidateTag("user");
    revalidateTag(`user-${id}`);
    revalidatePath("/users");
  }
  return data;
};

export const getUserLikedSong = async (id: string): Promise<any> => {
  const data = await apiClient.post<IUserResponse>(`user/liked-songs`, {
    userId: id,
  });
  console.log(data)
  return data;
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
