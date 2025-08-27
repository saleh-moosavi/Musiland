import { create } from "zustand";

interface PopUpStoreType {
  id: string;
  name: string;
  type: string;
  isOpen: boolean;
  setId: (id: string) => void;
  setName: (name: string) => void;
  setType: (type: string) => void;
  setIsOpen: (isOpen: boolean) => void;
}

const PopUpStore = create<PopUpStoreType>((set) => ({
  id: "",
  name: "",
  type: "",
  isOpen: false,
  setId: (id) => set({ id }),
  setName: (name) => set({ name }),
  setType: (type) => set({ type }),
  setIsOpen: (isOpen) => set({ isOpen }),
}));

export default PopUpStore;
