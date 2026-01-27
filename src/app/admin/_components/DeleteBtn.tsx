"use client";
import { Trash } from "lucide-react";
import { deleteTypes } from "@/types";
import PopUpStore from "@/store/popUpStore";
import { IUserResponse } from "@/models/user";
import { IGenreResponse } from "@/services/genre";
import { IAlbumResponse } from "@/models/album";
import { ISingerResponse } from "@/models/singer";
import { IPlaylistResponse } from "@/services/playlist";

interface IProps {
  id: string;
  name: string;
  type: deleteTypes;
  deleteFn: (
    id: string
  ) => Promise<
    | IGenreResponse
    | IPlaylistResponse
    | ISingerResponse
    | IAlbumResponse
    | IUserResponse
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
