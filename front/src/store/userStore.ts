import { create } from "zustand";

interface UserStore {
  isLoggedIn: boolean;
  setIsLoggedIn: (isLoggedIn: boolean) => void;
  likedSongs: string[];
  setLikedSongs: (likedSong: string[]) => void;
}

const useUserStore = create<UserStore>((set) => ({
  isLoggedIn: false,
  setIsLoggedIn: (isLoggedIn) => set({ isLoggedIn }),
  likedSongs: [],
  setLikedSongs: (likedSongs) => set({ likedSongs }),
}));

export default useUserStore;
