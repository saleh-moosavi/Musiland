import apiClient from "@/configs/axios";
import { IAuthResponse } from "./user";

export const registerUser = async (
  name: string,
  email: string,
  password: string
): Promise<IAuthResponse> => {
  const res = await apiClient.post<IAuthResponse>("/register", {
    name,
    email,
    password,
  });
  return res.data;
};

export const loginUser = async (
  email: string,
  password: string
): Promise<IAuthResponse> => {
  const res = await apiClient.post<IAuthResponse>("/login", {
    email,
    password,
  });
  return res.data;
};

export const logoutUser = async (): Promise<IAuthResponse> => {
  const res = await apiClient.get<IAuthResponse>("/logout");
  return res.data;
};

export const checkAuthStatus = async (): Promise<IAuthResponse> => {
  const res = await apiClient.get<IAuthResponse>("/check-auth-status");
  return res.data;
};
