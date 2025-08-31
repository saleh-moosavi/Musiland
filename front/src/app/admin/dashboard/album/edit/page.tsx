import GenericForm from "@/components/admin/GenericForm";

export default function editAlbumPage() {
  return (
    <GenericForm
      mode="edit"
      schemaKey="album"
      baseUrl="/albums"
      redirectPath="/admin/dashboard/album"
      itemName="Album"
      idParamKey="albumId"
      nameParamKey="albumName"
    />
  );
}
