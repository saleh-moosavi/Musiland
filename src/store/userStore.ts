import { create } from "zustand";
import { IAuth } from "@/services/user";

interface UserStore {
  likedSongs: string[];
  setLikedSongs: (likedSong: string[]) => void;
  userData: IAuth | null;
  setUserData: (userData: IAuth | null) => void;
}

const useUserStore = create<UserStore>((set) => ({
  likedSongs: [],
  setLikedSongs: (likedSongs) => set({ likedSongs }),
  userData: null,
  setUserData: (userData) => set({ userData }),
}));

export default useUserStore;
