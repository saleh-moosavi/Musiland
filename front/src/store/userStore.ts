import { create } from "zustand";

interface UserStore {
  userId: string;
  setUserId: (userId: string) => void;
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  likedSongs: string[];
  setLikedSongs: (likedSong: string[]) => void;
}

const useUserStore = create<UserStore>((set) => ({
  userId: "",
  setUserId: (userId) => set({ userId }),
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  likedSongs: [],
  setLikedSongs: (likedSongs) => set({ likedSongs }),
}));

export default useUserStore;
