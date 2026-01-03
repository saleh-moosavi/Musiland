import { createGenre } from "@/services/genre";
import GenericForm from "@/components/admin/GenericForm";

export default function addGenrePage() {
  return (
    <GenericForm
      mode="add"
      title="Genre"
      schemaKey="genre"
      redirectPath="/genre"
      submitFn={createGenre}
    />
  );
}
