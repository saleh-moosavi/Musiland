import { createAlbum } from "@/services/album";
import GenericForm from "@/components/admin/GenericForm";

export default function addAlbumPage() {
  return (
    <GenericForm
      mode="add"
      title="Album"
      schemaKey="album"
      redirectPath="/album"
      submitFn={createAlbum}
    />
  );
}
