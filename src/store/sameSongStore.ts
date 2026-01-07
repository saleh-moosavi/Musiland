import { ISong } from "@/models/song";
import { create } from "zustand";

interface SameSongsStore {
  isPanelVisible: boolean;
  sameSongsList: ISong[];
  setIsPanelVisible: (isPanelVisible: boolean) => void;
  setSameSongsList: (sameSongsList: ISong[]) => void;
}

const useSameSongsStore = create<SameSongsStore>((set) => ({
  isPanelVisible: false,
  sameSongsList: [],
  setIsPanelVisible: (isPanelVisible) => set({ isPanelVisible }),
  setSameSongsList: (sameSongsList) => set({ sameSongsList }),
}));

export default useSameSongsStore;
