import { create } from "zustand";
import { deleteTypes } from "@/types";
import { IGenreResponse } from "@/models/genre";
import { IAlbumResponse } from "@/models/album";
import { ISingerResponse } from "@/models/singer";
import { IPlaylistResponse } from "@/models/playlist";

interface PopUpStoreType {
  id: string;
  name: string;
  isOpen: boolean;
  type: deleteTypes;
  popUpFn?:
    | ((
        id: string
      ) => Promise<
        IPlaylistResponse | IGenreResponse | ISingerResponse | IAlbumResponse
      >)
    | null;
  // Setters
  setId: (id: string) => void;
  setName: (name: string) => void;
  setType: (type: deleteTypes) => void;
  setIsOpen: (isOpen: boolean) => void;
  setPopUpFn: (
    popUpFn: (
      id: string
    ) => Promise<
      IPlaylistResponse | IGenreResponse | ISingerResponse | IAlbumResponse
    >
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
