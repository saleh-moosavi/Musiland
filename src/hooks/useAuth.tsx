"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import {
  loginUser,
  logoutUser,
  registerUser,
  checkAuthStatus,
} from "@/services/auth";

export default function useAuth() {
  const router = useRouter();
  const { userData, setUserData } = useUserStore();
  const [error, setError] = useState<string | null>(null);

  const logOut = async () => {
    const data = await logoutUser();
    if (data.success) {
      setUserData(null);
      router.push("/login");
      setError(null);
    } else {
      setError(data.message ?? "Error");
    }
  };

  const logIn = async (email: string, password: string) => {
    const res = await loginUser(email, password);
    if (res.success && res.data) {
      setUserData({ ...res.data });
      setError(null);
    } else {
      setError(res.message ?? "Error");
    }
    return res;
  };

  const register = async (name: string, email: string, password: string) => {
    const res = await registerUser(name, email, password);
    if (res.success && res.data) {
      setUserData({ ...res.data });
      setError(null);
    } else {
      setError(res.message ?? "Error");
    }
    return res;
  };

  const checkAuth = async () => {
    if (userData !== null) return;
    const res = await checkAuthStatus();
    if (res.success && res.data) {
      setUserData({ ...res.data });
      setError(null);
    } else {
      setError(res.message ?? "Error");
    }
    return res;
  };

  return { register, logIn, logOut, checkAuth, error };
}
