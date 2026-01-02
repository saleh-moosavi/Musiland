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
  console.log(res);
  return res;
};

export const loginUser = async (email: string, password: string) => {
  const res = await apiClient.post("/login", { email, password });
  console.log(res);
  return res;
};

export const logoutUser = async () => {
  const res = await apiClient.get("/logout", {});
  return res;
};
