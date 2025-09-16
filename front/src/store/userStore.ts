import { userProfileType } from "@/types/user";
import { create } from "zustand";

interface UserStore {
  userId: string;
  setUserId: (userId: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  likedSongs: string[];
  setLikedSongs: (likedSong: string[]) => void;
  userData: userProfileType | null;
  setUserData: (userData: userProfileType | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
  userId: "",
  setUserId: (userId) => set({ userId }),
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  likedSongs: [],
  setLikedSongs: (likedSongs) => set({ likedSongs }),
  userData: null,
  setUserData: (userData) => set({ userData }),
}));

export default useUserStore;
