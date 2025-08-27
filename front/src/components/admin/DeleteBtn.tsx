"use client";
import { Trash } from "lucide-react";
import PopUpStore from "@/store/popUpStore";

export default function DeleteBtn({
  id,
  name,
  type,
}: {
  id: string;
  name: string;
  type: string;
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
      className="text-red-500 cursor-pointer size-5"
    >
      <Trash />
    </button>
  );
}
