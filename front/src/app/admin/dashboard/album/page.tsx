import Link from "next/link";
import { getAlbums } from "@/services/album";
import Button from "@/components/shared/Button";
import EditBtn from "@/components/admin/EditBtn";
import { generalItems } from "@/types/generalItems";
import DeleteBtn from "@/components/admin/DeleteBtn";

export default async function AlbumList() {
  const data = await getAlbums();
  const albums: generalItems[] = data.data;

  if (albums.length < 1) {
    return (
      <p className="dark:text-my-red-med font-semibold">
        {"There Is No Album Here!!!"}
      </p>
    );
  }

  return (
    <section className="h-full w-full flex flex-col justify-start gap-10 dark:text-my-white-low">
      <Link href="/admin/dashboard/album/add" className="w-fit self-end">
        <Button text="Album" type="button" />
      </Link>
      {albums.length > 0 ? (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 *:col-span-1 gap-5 w-full">
          {albums.map((album) => {
            return (
              <li
                className="w-full flex justify-between items-center gap-5 bg-my-white-low dark:bg-my-black-max shadow-md shadow-my-black-low/30 p-5 rounded-xl"
                key={album?._id}
              >
                <p>{album.name}</p>
                <article className="flex gap-5 items-center">
                  <EditBtn id={album._id} name={album.name} type="album" />
                  <DeleteBtn id={album._id} name={album.name} type="album" />
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center">Sorry There Is No Album</p>
      )}
    </section>
  );
}
