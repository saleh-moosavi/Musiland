import Link from "next/link";

export default async function AlbumList() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums`);
  const albums = await data.json();
  return (
    <section className="h-full w-full flex flex-col justify-start gap-10">
      <Link
        href="/admin/dashboard/album/add"
        className="w-fit bg-gradient-to-r from-cyan-700 to-emerald-400 text-white px-4 py-2 font-bold rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer self-end"
      >
        Add Album
      </Link>
      {albums.length > 0 ? (
        <ul className="grid grid-cols-2 *:col-span-1 gap-5 w-full">
          {albums.map((album: any) => {
            return (
              <li
                className="w-full flex justify-between items-center gap-5 bg-white p-2 rounded-full"
                key={album?._id}
              >
                <p>{album.name}</p>
                <article className="flex gap-2 items-center">
                  <Link
                    href={`/admin/dashboard/album/edit?albumId=${album._id}&albumName=${album.name}`}
                  >
                    Edit
                  </Link>
                  <Link href={"/dashboard/album"}>Delete</Link>
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center dark:text-white">Sorry There Is No Album</p>
      )}
    </section>
  );
}
