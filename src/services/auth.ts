import apiClient from "@/configs/axios";

export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await apiClient.post("/register", {
    username,
    email,
    password,
  });
  return res;
};

export const loginUser = async (email: string, password: string) => {
  const res = await apiClient.post("/login", { email, password });
  return res;
};

export const logoutUser = async () => {
  const res = await apiClient.get("/logout", {});
  return res;
};
