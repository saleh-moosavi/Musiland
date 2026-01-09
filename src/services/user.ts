import apiClient from "@/configs/axios";
import { IAuth } from "@/models/user";

export const getAllUsers = async () => {
  const res = await apiClient.get("/user");
  return res;
};

export const getUser = async (id: string): Promise<IAuth> => {
  const res = await apiClient.get<IAuth>(`/user/${id}`);
  return res.data;
};

export const addUser = async (data: {
  name: string;
  password: string;
  email: string;
}) => {
  const res = await apiClient.post("/user", data);
  return res;
};

export const editUser = async (
  userId: string,
  data: { name: string; password: string; email: string }
) => {
  const res = await apiClient.put("/user", { data, id: userId });
  return res;
};

export const deleteUser = async (id: string) => {
  const res = await apiClient.delete(`user/${id}`);
  return res;
};
