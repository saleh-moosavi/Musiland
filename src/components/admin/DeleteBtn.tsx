"use client";
import { Trash } from "lucide-react";
import PopUpStore from "@/store/popUpStore";
import { deleteTypes } from "@/types/shared";

export default function DeleteBtn({
  id,
  name,
  type,
}: {
  id: string;
  name: string;
  type: deleteTypes;
}) {
  const { setType, setName, setIsOpen, setId } = PopUpStore();
  const handleDelete = () => {
    setId(id);
    setName(name);
    setType(type);
    setIsOpen(true);
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
