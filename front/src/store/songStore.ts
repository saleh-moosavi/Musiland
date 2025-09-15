import { create } from "zustand";
import { Comment } from "@/types/comment";

interface SongStore {
  likesCount: number | null;
  setLikesCount: (likesCount: number | null) => void;
  comments: Comment[];
  setComments: (comments: Comment[]) => void;
}

const useSongStore = create<SongStore>((set) => ({
  likesCount: null,
  setLikesCount: (likesCount) => set({ likesCount }),
  comments: [],
  setComments: (comments) => set({ comments }),
}));

export default useSongStore;
