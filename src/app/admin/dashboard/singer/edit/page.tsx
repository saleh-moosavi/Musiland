import { editSinger } from "@/services/singer";
import GenericForm from "@/app/admin/_components/GenericForm";

export default function EditSingerPage() {
  return (
    <GenericForm
      mode="edit"
      title="Singer"
      submitFn={editSinger}
      redirectPath="/singer"
    />
  );
}
