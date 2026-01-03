import GenericForm from "@/components/admin/GenericForm";
import { createPlaylist } from "@/services/playlist";

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
