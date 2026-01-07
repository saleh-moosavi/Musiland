import { create } from "zustand";
import { IGenre } from "@/models/genre";
import { IPlaylist } from "@/models/playlist";

interface MusicStore {
  audioSrc: string;
  audioName: string;
  audioCover: string;
  audioGenres: IGenre[];
  audioPlaylists: IPlaylist[];
  setAudioSrc: (audioSrc: string) => void;
  setAudioName: (audioName: string) => void;
  setAudioCover: (setAudioSrc: string) => void;
  setAudioGenres: (audioGenres: IGenre[]) => void;
  setAudioPlaylists: (audioPlaylists: IPlaylist[]) => void;
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
