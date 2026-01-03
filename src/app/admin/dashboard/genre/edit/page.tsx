import { editGenre } from "@/services/genre";
import GenericForm from "@/components/admin/GenericForm";

export default function editGenrePage() {
  return (
    <GenericForm
      mode="edit"
      title="Genre"
      schemaKey="genre"
      redirectPath="/genre"
      submitFn={editGenre}
    />
  );
}
