import { editPlaylist } from "@/services/playlist";
import GenericForm from "@/components/admin/GenericForm";

export default function editPlaylistPage() {
  return (
    <GenericForm
      mode="edit"
      title="Playlist"
      schemaKey="playlist"
      redirectPath="/playlist"
      submitFn={editPlaylist}
    />
  );
}
