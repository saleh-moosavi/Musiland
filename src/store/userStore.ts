import { create } from "zustand";
import { IUser } from "@/models/user";

interface UserStore {
  userId: string;
  setUserId: (userId: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  likedSongs: string[];
  setLikedSongs: (likedSong: string[]) => void;
  userData: IUser | null;
  setUserData: (userData: IUser | null) => void;
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
