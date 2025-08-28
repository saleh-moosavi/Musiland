import { create } from "zustand";

interface PopUpStoreType {
  isToastOpen: boolean;
  toastTitle: string;
  toastColor: "red" | "green" | "orange";
  setIsToastOpen: (isToastOpen: boolean) => void;
  setToastTitle: (toastTitle: string) => void;
  setToastColor: (toastColor: "red" | "green" | "orange") => void;
}

const useToastStore = create<PopUpStoreType>((set) => ({
  isToastOpen: false,
  toastTitle: "",
  toastColor: "green",

  setIsToastOpen: (isToastOpen: boolean) =>
    set(() => ({
      isToastOpen,
    })),
  setToastTitle: (toastTitle: string) =>
    set(() => ({
      toastTitle,
    })),
  setToastColor: (toastColor: "red" | "green" | "orange") =>
    set(() => ({
      toastColor,
    })),
}));

export default useToastStore;
