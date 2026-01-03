"use client";
import { Trash } from "lucide-react";
import PopUpStore from "@/store/popUpStore";
import { deleteTypes } from "@/types/shared";
import { ApiResponse, IGeneralRes } from "@/types/generalItems";

export default function DeleteBtn({
  id,
  name,
  type,
  deleteFn,
}: {
  id: string;
  name: string;
  type: deleteTypes;
  deleteFn: (id: string) => Promise<ApiResponse<IGeneralRes>>;
}) {
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
