import { IAuth } from "@/models/user";
import apiClient from "@/configs/axios";

export const registerUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await apiClient.post("/register", {
    name,
    email,
    password,
  });
  return res.data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<IAuth> => {
  const res = await apiClient.post("/login", { email, password });
  return res as unknown as IAuth;
};

export const logoutUser = async () => {
  const res = await apiClient.get("/logout", {});
  return res;
};
