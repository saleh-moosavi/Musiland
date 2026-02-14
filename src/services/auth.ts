import { IAuthResponse } from "./user";
import { apiClient } from "@/configs/apiConfig";

export const registerUser = async (
  name: string,
  email: string,
  password: string,
): Promise<IAuthResponse> => {
  const res = await apiClient.post<IAuthResponse>("/register", {
    name,
    email,
    password,
  });
  return res;
};

export const loginUser = async (
  email: string,
  password: string,
): Promise<IAuthResponse> => {
  const res = await apiClient.post<IAuthResponse>("/login", {
    email,
    password,
  });
  return res;
};

export const logoutUser = async (): Promise<IAuthResponse> => {
  const res = await apiClient.get<IAuthResponse>("/logout");
  return res;
};

export const checkAuthStatus = async (): Promise<IAuthResponse> => {
  const res = await apiClient.get<IAuthResponse>("/check-auth-status");
  return res;
};
