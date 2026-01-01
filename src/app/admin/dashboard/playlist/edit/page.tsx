import GenericForm from "@/components/admin/GenericForm";

export default function editPlaylistPage() {
  return (
    <GenericForm
      mode="edit"
      schemaKey="playlist"
      baseUrl="/playlists"
      redirectPath="/admin/dashboard/playlist"
      itemName="Playlist"
      idParamKey="playlistId"
      nameParamKey="playlistName"
    />
  );
}
