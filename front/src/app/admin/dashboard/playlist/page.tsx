import Link from "next/link";

export default async function PlaylistList() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/playlists`);
  const playlists = await data.json();
  return (
    <section className="h-full w-full flex flex-col justify-start gap-10">
      <Link
        href="/admin/dashboard/playlist/add"
        className="w-fit bg-gradient-to-r from-cyan-700 to-emerald-400 text-white px-4 py-2 font-bold rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer self-end"
      >
        Add Playlist
      </Link>
      {playlists.length > 0 ? (
        <ul className="grid grid-cols-2 *:col-span-1 gap-5 w-full">
          {playlists.map((playlist: any) => {
            return (
              <li
                className="w-full flex justify-between items-center gap-5 bg-white p-2 rounded-full"
                key={playlist?._id}
              >
                <p>{playlist.name}</p>
                <article className="flex gap-2 items-center">
                  <Link
                    href={`/admin/dashboard/playlist/edit?playlistId=${playlist._id}&playlistName=${playlist.name}`}
                  >
                    Edit
                  </Link>
                  <Link href={"/dashboard/playlist"}>Delete</Link>
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center dark:text-white">
          Sorry There Is No Playlist
        </p>
      )}
    </section>
  );
}
