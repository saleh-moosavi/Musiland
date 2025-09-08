import Link from "next/link";
import Button from "@/components/shared/Button";
import EditBtn from "@/components/admin/EditBtn";
import DeleteBtn from "@/components/admin/DeleteBtn";

export default async function PlaylistList() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/playlists`);
  const playlists = await data?.json();
  return (
    <section className="h-full w-full flex flex-col justify-start gap-10 dark:text-my-white-low">
      <Link href="/admin/dashboard/playlist/add" className="w-fit self-end">
        <Button text="Playlist" type="button" />
      </Link>
      {playlists.length > 0 ? (
        <ul className="grid grid-cols-3 *:col-span-1 gap-5 w-full">
          {playlists.map((playlist: any) => {
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
