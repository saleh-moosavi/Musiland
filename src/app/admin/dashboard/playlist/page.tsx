import Link from "next/link";
import FormButton from "@/components/FormButton";
import EditBtn from "@/app/admin/_components/EditBtn";
import AlterّResult from "../../_components/AlterResult";
import DeleteBtn from "@/app/admin/_components/DeleteBtn";
import { deletePlaylist, getAllPlaylists } from "@/services/playlist";

export default async function PlaylistList() {
  const data = await getAllPlaylists();
  const playlists = data.data;

  return (
    <section className="h-full w-full flex flex-col justify-start gap-10 dark:text-my-white-low">
      <Link href="/admin/dashboard/playlist/add" className="w-fit self-end">
        <FormButton type="button">Add Playlist</FormButton>
      </Link>
      {data.success && playlists && playlists.length > 0 ? (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 *:col-span-1 gap-5 w-full">
          {playlists.map((playlist) => {
            return (
              <li
                className="w-full flex justify-between items-center gap-5 bg-my-white-low dark:bg-my-black-max shadow-md shadow-my-black-low/30 p-5 rounded-xl"
                key={playlist?._id}
              >
                <p>{playlist.name}</p>
                <article className="flex gap-5 items-center">
                  <EditBtn
                    id={playlist._id}
                    name={playlist.name}
                    type="playlist"
                  />
                  <DeleteBtn
                    type="playlist"
                    id={playlist._id}
                    name={playlist.name}
                    deleteFn={deletePlaylist}
                  />
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <AlterّResult title={data.message || "There Is No Playlist"} />
      )}
    </section>
  );
}
