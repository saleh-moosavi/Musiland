import { createGenre } from "@/services/genre";
import GenericForm from "@/app/admin/_components/GenericForm";

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
