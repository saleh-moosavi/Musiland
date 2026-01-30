import { create } from "zustand";
import { IGenre } from "@/services/genre";
import { IComment } from "@/services/comment";
import { IPlaylist } from "@/services/playlist";

interface MusicStore {
  audioSrc: string;
  audioName: string;
  audioCover: string;
  audioGenres: IGenre[];
  audioPlaylists: IPlaylist[];
  likesCount: number | null;
  comments: IComment[];
  setAudioSrc: (audioSrc: string) => void;
  setAudioName: (audioName: string) => void;
  setAudioCover: (setAudioSrc: string) => void;
  setAudioGenres: (audioGenres: IGenre[]) => void;
  setAudioPlaylists: (audioPlaylists: IPlaylist[]) => void;
  setLikesCount: (likesCount: number | null) => void;
  setComments: (comments: IComment[]) => void;
}

const useMusicStore = create<MusicStore>((set) => ({
  audioSrc: "",
  audioName: "",
  audioCover: "",
  audioGenres: [],
  audioPlaylists: [],
  likesCount: null,
  comments: [],
  setAudioSrc: (audioSrc) => set({ audioSrc }),
  setAudioName: (audioName) => set({ audioName }),
  setAudioCover: (audioCover) => set({ audioCover }),
  setAudioGenres: (audioGenres) => set({ audioGenres }),
  setAudioPlaylists: (audioPlaylists) => set({ audioPlaylists }),
  setLikesCount: (likesCount) => set({ likesCount }),
  setComments: (comments) => set({ comments }),
}));

export default useMusicStore;
