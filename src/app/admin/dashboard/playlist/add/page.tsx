import { createPlaylist } from "@/services/playlist";
import GenericForm from "@/app/admin/_components/GenericForm";

export default function addPlaylistPage() {
  return (
    <GenericForm
      mode="add"
      title="Playlist"
      redirectPath="/playlist"
      submitFn={createPlaylist}
    />
  );
}
