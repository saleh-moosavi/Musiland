import Link from "next/link";
import { Edit } from "lucide-react";
import { deleteTypes } from "@/types";

interface IProps {
  id: string;
  type: deleteTypes;
  name: string;
}

export default function EditBtn({ id, type, name }: IProps) {
  return (
    <Link
      className="text-my-blue-med size-5"
      href={`/admin/dashboard/${type}/edit?itemId=${id}&itemName=${name}`}
    >
      <Edit />
    </Link>
  );
}
