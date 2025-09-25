"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import { logoutUser } from "@/services/auth";

export default function useAuthCheck(likes?: boolean) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isLoggedIn, setIsLoggedIn, likedSongs, setLikedSongs, setUserId } =
    useUserStore();
  const { userData, setUserData } = useUserStore();

  const logOut = async () => {
    const data = await logoutUser();

    if (data.ok) {
      setIsLoggedIn(false);
      router.push("/login");
    } else {
      setError(data.error || "Logout failed");
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      try {
        const query = likes ? "?like=true" : "";
        const res = await fetch(`/api/getUserData${query}`, {
          method: "GET",
          credentials: "include",
        });

        const data = await res.json();
        if (data.ok) {
          if (data?.user) {
            setError(null);
            setIsLoggedIn(true);
            setUserData(data.user);
            setUserId(data.user.id);
            likes && setLikedSongs(data.user.likedSongs);
          } else {
            setUserData(null);
            setIsLoggedIn(false);
            setError("User data not found");
          }
        } else {
          setUserData(null);
          setIsLoggedIn(false);
          setError(data.error || "Server error");
        }
      } catch (error) {
        setIsLoggedIn(false);
        setUserData(null);
        setError(
          `Failed to fetch user data: ${
            error instanceof Error ? error.message : String(error)
          }`
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, []);

  return {
    userData,
    isLoggedIn,
    error,
    isLoading,
    likedSongs,
    setLikedSongs,
    logOut,
  };
}
