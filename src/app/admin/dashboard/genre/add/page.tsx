import { createGenre } from "@/services/genre";
import GenericForm from "@/components/admin/GenericForm";

export default function addGenrePage() {
  return (
    <GenericForm
      mode="add"
      title="Genre"
      redirectPath="/genre"
      submitFn={createGenre}
    />
  );
}
