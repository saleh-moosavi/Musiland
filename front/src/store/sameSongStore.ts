import { create } from "zustand";

interface SameSongsStore {
  isPanelVisible: boolean;
  sameSongsList: any[];
  setIsPanelVisible: (isPanelVisible: boolean) => void;
  setSameSongsList: (sameSongsList: any[]) => void;
}

const useSameSongsStore = create<SameSongsStore>((set) => ({
  isPanelVisible: false,
  sameSongsList: [],
  setIsPanelVisible: (isPanelVisible) => set({ isPanelVisible }),
  setSameSongsList: (sameSongsList) => set({ sameSongsList }),
}));

export default useSameSongsStore;
