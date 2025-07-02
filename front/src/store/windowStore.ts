import { create } from "zustand";

interface WindowStore {
  navbarData: any[];
  showSubNav: boolean;
  showMobileMenuPanel: boolean;
  setNavbarData: (navbarData: any[]) => void;
  setShowSubNav: (showSubNav: boolean) => void;
  setShowMobileMenuPanel: (showSubNav: boolean) => void;
}

const useWindowStore = create<WindowStore>((set) => ({
  navbarData: [],
  showSubNav: false,
  showMobileMenuPanel: false,
  setNavbarData: (navbarData) => set({ navbarData }),
  setShowSubNav: (showSubNav) => set({ showSubNav }),
  setShowMobileMenuPanel: (showMobileMenuPanel) => set({ showMobileMenuPanel }),
}));

export default useWindowStore;
