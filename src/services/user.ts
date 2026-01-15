import apiClient from "@/configs/axios";
import {
  IAuthResponse,
  IGetAllUsersResponse,
  IUserResponse,
} from "@/models/user";

export const getAllUsers = async (): Promise<IGetAllUsersResponse> => {
  const res = await apiClient.get<IGetAllUsersResponse>("/user");
  return res.data;
};

export const getUser = async (id: string): Promise<IUserResponse> => {
  const res = await apiClient.get<IUserResponse>(`/user/${id}`);
  return res.data;
};

interface IProps {
  name: string;
  password: string;
  email: string;
}

export const addUser = async (data: IProps): Promise<IAuthResponse> => {
  const res = await apiClient.post<IAuthResponse>("/user", data);
  return res.data;
};

export const editUser = async (
  id: string,
  data: IProps
): Promise<IAuthResponse> => {
  const res = await apiClient.put<IAuthResponse>("/user", { data, id });
  return res.data;
};

export const deleteUser = async (id: string): Promise<IUserResponse> => {
  const res = await apiClient.delete<IUserResponse>(`user/${id}`);
  return res.data;
};
