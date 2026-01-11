import GenericForm from "@/components/admin/GenericForm";
import { createSinger } from "@/services/singer";

export default function AddSingerPage() {
  return (
    <GenericForm
      mode="add"
      title="Singer"
      submitFn={createSinger}
      redirectPath="/singer"
    />
  );
}
