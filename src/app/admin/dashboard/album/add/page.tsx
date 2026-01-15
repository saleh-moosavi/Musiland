import { createAlbum } from "@/services/album";
import GenericForm from "@/app/admin/_components/GenericForm";

export default function addAlbumPage() {
  return (
    <GenericForm
      mode="add"
      title="Album"
      redirectPath="/album"
      submitFn={createAlbum}
    />
  );
}
