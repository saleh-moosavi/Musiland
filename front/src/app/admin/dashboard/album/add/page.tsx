import GenericForm from "@/components/admin/GenericForm";

export default function addAlbumPage() {
  return (
    <GenericForm
      mode="add"
      schemaKey="album"
      baseUrl="/albums"
      redirectPath="/admin/dashboard/album"
      itemName="Album"
      idParamKey="albumId"
      nameParamKey="albumName"
    />
  );
}
