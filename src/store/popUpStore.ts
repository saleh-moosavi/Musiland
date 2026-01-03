import { create } from "zustand";
import { deleteTypes } from "@/types/shared";
import { ApiResponse, IGeneralRes } from "@/types/generalItems";

interface PopUpStoreType {
  id: string;
  name: string;
  isOpen: boolean;
  type: deleteTypes;
  popUpFn?: ((id: string) => Promise<ApiResponse<IGeneralRes>>) | null;
  setId: (id: string) => void;
  setName: (name: string) => void;
  setType: (type: deleteTypes) => void;
  setIsOpen: (isOpen: boolean) => void;
  setPopUpFn: (
    popUpFn: (id: string) => Promise<ApiResponse<IGeneralRes>>
  ) => void;
}

const PopUpStore = create<PopUpStoreType>((set) => ({
  id: "",
  name: "",
  type: null,
  isOpen: false,
  popUpFn: null,
  setId: (id) => set({ id }),
  setName: (name) => set({ name }),
  setType: (type) => set({ type }),
  setIsOpen: (isOpen) => set({ isOpen }),
  setPopUpFn: (popUpFn) => set({ popUpFn }),
}));

export default PopUpStore;
