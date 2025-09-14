import { create } from "zustand";
import { Comment } from "@/types/comment";

interface SongStore {
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
}

const useSongStore = create<SongStore>((set) => ({
  comments: [],
  setComments: (comments) => set({ comments }),
}));

export default useSongStore;
