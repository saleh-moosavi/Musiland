import { create } from "zustand";
import { IComment } from "@/models/comment";

interface SongStore {
  likesCount: number | null;
  setLikesCount: (likesCount: number | null) => void;
  comments: IComment[];
  setComments: (comments: IComment[]) => void;
}

const useSongStore = create<SongStore>((set) => ({
  likesCount: null,
  setLikesCount: (likesCount) => set({ likesCount }),
  comments: [],
  setComments: (comments) => set({ comments }),
}));

export default useSongStore;
