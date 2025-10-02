import Link from "next/link";
import Button from "@/components/shared/Button";
import EditBtn from "@/components/admin/EditBtn";
import { generalItems } from "@/types/generalItems";
import DeleteBtn from "@/components/admin/DeleteBtn";
import { getAllPlaylists } from "@/services/playlist";

export default async function PlaylistList() {
  const data = await getAllPlaylists();
  if (data.ok === false) {
    return (
      <p className="dark:text-my-red-med font-semibold">
        {data.error || "Something Went Wrong!!!"}
      </p>
    );
  }
  const playlists: generalItems[] = data.playlists;
  return (
    <section className="h-full w-full flex flex-col justify-start gap-10 dark:text-my-white-low">
      <Link href="/admin/dashboard/playlist/add" className="w-fit self-end">
        <Button text="Playlist" type="button" />
      </Link>
      {playlists.length > 0 ? (
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
                    id={playlist._id}
                    name={playlist.name}
                    type="playlist"
                  />
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center">Sorry There Is No Playlist</p>
      )}
    </section>
  );
}
