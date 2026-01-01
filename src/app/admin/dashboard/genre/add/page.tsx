import GenericForm from "@/components/admin/GenericForm";

export default function addGenrePage() {
  return (
    <GenericForm
      mode="add"
      schemaKey="genre"
      baseUrl="/genres"
      redirectPath="/admin/dashboard/genre"
      itemName="Genre"
      idParamKey="genreId"
      nameParamKey="genreName"
    />
  );
}
