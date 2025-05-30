import { create } from "zustand";

interface MusicStore {
  audioSrc: string;
  audioCover: string;
  setAudioSrc: (audioSrc: string) => void;
  setAudioCover: (setAudioSrc: string) => void;
}

const useMusicStore = create<MusicStore>((set) => ({
  audioSrc: "",
  audioCover: "",
  setAudioSrc: (audioSrc) => set({ audioSrc }),
  setAudioCover: (audioCover) => set({ audioCover }),
}));

export default useMusicStore;
