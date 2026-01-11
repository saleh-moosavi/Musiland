import apiClient from "@/configs/axios";
import { IAuth, IGetAllAuth } from "@/models/user";

export const getAllUsers = async (): Promise<IGetAllAuth> => {
  const res = await apiClient.get<IGetAllAuth>("/user");
  return res.data;
};

export const getUser = async (id: string): Promise<IAuth> => {
  const res = await apiClient.get<IAuth>(`/user/${id}`);
  return res.data;
};

interface IProps {
  name: string;
  password: string;
  email: string;
}

export const addUser = async (data: IProps): Promise<IAuth> => {
  const res = await apiClient.post<IAuth>("/user", data);
  return res.data;
};

export const editUser = async (id: string, data: IProps): Promise<IAuth> => {
  const res = await apiClient.put<IAuth>("/user", { data, id });
  return res.data;
};

export const deleteUser = async (id: string): Promise<IAuth> => {
  const res = await apiClient.delete<IAuth>(`user/${id}`);
  return res.data;
};
