import { createPlaylist } from "@/services/playlist";
import GenericForm from "@/components/admin/GenericForm";

export default function addPlaylistPage() {
  return (
    <GenericForm
      mode="add"
      title="Playlist"
      schemaKey="playlist"
      redirectPath="/playlist"
      submitFn={createPlaylist}
    />
  );
}
