import { create } from "zustand";

interface MusicStore {
  audioSrc: string;
  audioName: string;
  audioCover: string;
  setAudioSrc: (audioSrc: string) => void;
  setAudioName: (audioName: string) => void;
  setAudioCover: (setAudioSrc: string) => void;
}

const useMusicStore = create<MusicStore>((set) => ({
  audioSrc: "",
  audioName: "",
  audioCover: "",
  setAudioSrc: (audioSrc) => set({ audioSrc }),
  setAudioName: (audioName) => set({ audioName }),
  setAudioCover: (audioCover) => set({ audioCover }),
}));

export default useMusicStore;
