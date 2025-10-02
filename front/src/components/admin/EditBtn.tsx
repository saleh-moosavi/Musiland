import Link from "next/link";
import { Edit } from "lucide-react";
import { deleteTypes } from "@/types/shared";

export default function EditBtn({
  id,
  type,
  name,
}: {
  id: string;
  type: deleteTypes;
  name: string;
}) {
  return (
    <Link
      className="text-my-blue-med size-5"
      href={`/admin/dashboard/${type}/edit?${type}Id=${id}&${type}Name=${name}`}
    >
      <Edit />
    </Link>
  );
}
