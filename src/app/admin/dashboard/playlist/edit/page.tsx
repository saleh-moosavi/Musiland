import { editPlaylist } from "@/services/playlist";
import GenericForm from "@/components/admin/GenericForm";

export default function editPlaylistPage() {
  return (
    <GenericForm
      mode="edit"
      title="Playlist"
      redirectPath="/playlist"
      submitFn={editPlaylist}
    />
  );
}
