import GenericForm from "@/app/admin/_components/GenericForm";
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
