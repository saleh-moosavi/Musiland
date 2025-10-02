import { deleteTypes } from "@/types/shared";
import { create } from "zustand";

interface PopUpStoreType {
  id: string;
  name: string;
  type: deleteTypes;
  isOpen: boolean;
  setId: (id: string) => void;
  setName: (name: string) => void;
  setType: (type: deleteTypes) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const PopUpStore = create<PopUpStoreType>((set) => ({
  id: "",
  name: "",
  type: null,
  isOpen: false,
  setId: (id) => set({ id }),
  setName: (name) => set({ name }),
  setType: (type) => set({ type }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export default PopUpStore;
