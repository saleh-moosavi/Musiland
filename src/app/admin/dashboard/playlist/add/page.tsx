import GenericForm from "@/components/admin/GenericForm";

export default function addPlaylistPage() {
  return (
    <GenericForm
      mode="add"
      schemaKey="playlist"
      baseUrl="/playlists"
      redirectPath="/admin/dashboard/playlist"
      itemName="Playlist"
      idParamKey="playlistId"
      nameParamKey="playlistName"
    />
  );
}
