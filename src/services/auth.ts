import apiClient from "@/configs/axios";
import { IAuth } from "@/types/user";

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
  console.log(res);
  return res;
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
