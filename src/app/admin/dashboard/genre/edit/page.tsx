import GenericForm from "@/components/admin/GenericForm";

export default function editGenrePage() {
  return (
    <GenericForm
      mode="edit"
      schemaKey="genre"
      baseUrl="/genres"
      redirectPath="/admin/dashboard/genre"
      itemName="Genre"
      idParamKey="genreId"
      nameParamKey="genreName"
    />
  );
}
