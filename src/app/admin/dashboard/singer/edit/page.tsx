import { editSinger } from "@/services/singer";
import GenericForm from "@/components/admin/GenericForm";

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
