import { generalItems } from "@/types/generalItems";
import { create } from "zustand";

interface MusicStore {
  audioSrc: string;
  audioName: string;
  audioCover: string;
  audioGenres: generalItems[];
  audioPlaylists: generalItems[];
  setAudioSrc: (audioSrc: string) => void;
  setAudioName: (audioName: string) => void;
  setAudioCover: (setAudioSrc: string) => void;
  setAudioGenres: (audioGenres: generalItems[]) => void;
  setAudioPlaylists: (audioPlaylists: generalItems[]) => void;
}

const useMusicStore = create<MusicStore>((set) => ({
  audioSrc: "",
  audioName: "",
  audioCover: "",
  audioGenres: [],
  audioPlaylists: [],
  setAudioSrc: (audioSrc) => set({ audioSrc }),
  setAudioName: (audioName) => set({ audioName }),
  setAudioCover: (audioCover) => set({ audioCover }),
  setAudioGenres: (audioGenres) => set({ audioGenres }),
  setAudioPlaylists: (audioPlaylists) => set({ audioPlaylists }),
}));

export default useMusicStore;
