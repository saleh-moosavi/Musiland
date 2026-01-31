"use client";
import { Trash } from "lucide-react";
import { deleteTypes } from "@/types";
import PopUpStore from "@/store/popUpStore";
import { IUserResponse } from "@/services/user";
import { IGenreResponse } from "@/services/genre";
import { IAlbumResponse } from "@/services/album";
import { ISingerResponse } from "@/services/singer";
import { IPlaylistResponse } from "@/services/playlist";
import { ISongResponse } from "@/services/song";

interface IProps {
  id: string;
  name: string;
  type: deleteTypes;
  deleteFn: (
    id: string,
  ) => Promise<
    | IGenreResponse
    | IPlaylistResponse
    | ISingerResponse
    | IAlbumResponse
    | IUserResponse
    | ISongResponse
  >;
}

export default function DeleteBtn({ id, name, type, deleteFn }: IProps) {
  const { setType, setName, setIsOpen, setId, setPopUpFn } = PopUpStore();
  const handleDelete = () => {
    setId(id);
    setName(name);
    setType(type);
    setIsOpen(true);
    setPopUpFn(deleteFn);
  };
  return (
    <button
      onClick={handleDelete}
      className="text-my-red-med cursor-pointer size-5"
    >
      <Trash />
    </button>
  );
}
