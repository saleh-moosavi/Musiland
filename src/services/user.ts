import apiClient from "@/configs/axios";

export const getAllUsers = async () => {
  const res = await apiClient.get("/user");
  return res;
};

export const getUser = async (id: string) => {
  const res = await apiClient.get(`/user/${id}`);
  return res;
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
