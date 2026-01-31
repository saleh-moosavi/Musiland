import { create } from "zustand";
import { deleteTypes } from "@/types";
import { IUserResponse } from "@/services/user";
import { ISongResponse } from "@/services/song";
import { IGenreResponse } from "@/services/genre";
import { IAlbumResponse } from "@/services/album";
import { ISingerResponse } from "@/services/singer";
import { IPlaylistResponse } from "@/services/playlist";

interface PopUpStoreType {
  id: string;
  name: string;
  isOpen: boolean;
  type: deleteTypes;
  popUpFn?:
    | ((
        id: string,
      ) => Promise<
        | IPlaylistResponse
        | IGenreResponse
        | ISingerResponse
        | IAlbumResponse
        | IUserResponse
        | ISongResponse
      >)
    | null;
  // Setters
  setId: (id: string) => void;
  setName: (name: string) => void;
  setType: (type: deleteTypes) => void;
  setIsOpen: (isOpen: boolean) => void;
  setPopUpFn: (
    popUpFn: (
      id: string,
    ) => Promise<
      | IPlaylistResponse
      | IGenreResponse
      | ISingerResponse
      | IAlbumResponse
      | IUserResponse
      | ISongResponse
    >,
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
