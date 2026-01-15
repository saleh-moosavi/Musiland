import { editGenre } from "@/services/genre";
import GenericForm from "@/app/admin/_components/GenericForm";

export default function editGenrePage() {
  return (
    <GenericForm
      mode="edit"
      title="Genre"
      redirectPath="/genre"
      submitFn={editGenre}
    />
  );
}
