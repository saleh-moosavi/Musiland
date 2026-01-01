import { create } from "zustand";
import { generalItems } from "@/types/generalItems";

interface WindowStore {
  navbarData: generalItems[];
  showSubNav: boolean;
  showMobileMenuPanel: boolean;
  navbarType: "genre" | "playlist";
  setNavbarData: (navbarData: generalItems[]) => void;
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
