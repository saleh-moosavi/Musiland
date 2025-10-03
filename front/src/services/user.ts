import apiClient from "@/configs/axios";

export const addEditUser = async (
  mode: "add" | "edit",
  userId: string | null,
  data: { name: string; password: string; email: string; role: string }
) => {
  const url = mode === "add" ? "/users" : `/users/${userId}`;
  const method = mode === "add" ? "post" : "put";

  return apiClient[method](url, data).then((res) => res.data);
};

export const getUsers = () => apiClient.get("/users").then((res) => res.data);

export const getUser = (userId: string) =>
  apiClient.get(`/users/${userId}`).then((res) => res.data);
