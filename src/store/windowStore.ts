import { create } from "zustand";
import { IGenre } from "@/services/genre";
import { IPlaylist } from "@/models/playlist";

interface WindowStore {
  navbarData: IGenre[] | IPlaylist[];
  showSubNav: boolean;
  showMobileMenuPanel: boolean;
  navbarType: "genre" | "playlist";
  setNavbarData: (navbarData: IGenre[] | IPlaylist[]) => void;
  setShowSubNav: (showSubNav: boolean) => void;
  setShowMobileMenuPanel: (showSubNav: boolean) => void;
  setNavbarType: (navbarType: "genre" | "playlist") => void;
}

const useWindowStore = create<WindowStore>((set) => ({
  navbarData: [],
  showSubNav: false,
  navbarType: "genre",
  showMobileMenuPanel: false,
  setNavbarData: (navbarData) => set({ navbarData }),
  setShowSubNav: (showSubNav) => set({ showSubNav }),
  setNavbarType: (navbarType) => set({ navbarType }),
  setShowMobileMenuPanel: (showMobileMenuPanel) => set({ showMobileMenuPanel }),
}));

export default useWindowStore;
