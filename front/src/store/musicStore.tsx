import { create } from "zustand";

interface MusicStore {
  audioSrc: string;
  audioName: string;
  audioCover: string;
  audioGenres: string[];
  audioPlaylists: string[];
  setAudioSrc: (audioSrc: string) => void;
  setAudioName: (audioName: string) => void;
  setAudioCover: (setAudioSrc: string) => void;
  setAudioGenres: (audioGenres: string[]) => void;
  setAudioPlaylists: (audioPlaylists: string[]) => void;
}

const useMusicStore = create<MusicStore>((set) => ({
  audioSrc: "",
  audioName: "",
  audioCover: "",
  audioGenres: [""],
  audioPlaylists: [""],
  setAudioSrc: (audioSrc) => set({ audioSrc }),
  setAudioName: (audioName) => set({ audioName }),
  setAudioCover: (audioCover) => set({ audioCover }),
  setAudioGenres: (audioGenres) => set({ audioGenres }),
  setAudioPlaylists: (audioPlaylists) => set({ audioPlaylists }),
}));

export default useMusicStore;
