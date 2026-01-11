import { editAlbum } from "@/services/album";
import GenericForm from "@/components/admin/GenericForm";

export default function editAlbumPage() {
  return (
    <GenericForm
      mode="edit"
      title="Album"
      submitFn={editAlbum}
      redirectPath="/album"
    />
  );
}
