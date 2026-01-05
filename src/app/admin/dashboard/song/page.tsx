import Link from "next/link";
import Image from "next/image";
import Button from "@/components/shared/Button";
import EditBtn from "@/components/admin/EditBtn";
import DeleteBtn from "@/components/admin/DeleteBtn";
import { deleteSong, getAllSongs } from "@/services/song";

export default async function SongList() {
  const data = await getAllSongs("");
  const songs = data.data;

  return (
    <section className="h-full w-full flex flex-col justify-start gap-10 dark:text-my-white-low">
      <Link href="/admin/dashboard/song/add" className="w-fit self-end">
        <Button text="Song" type="button" />
      </Link>
      {data.success && songs.length > 0 ? (
        <ul className="grid lg:grid-cols-2 gap-5 w-full">
          {songs.map((song) => (
            <li
              className="w-full flex justify-between items-center gap-5 bg-my-white-low dark:bg-my-black-max p-2 rounded-3xl shadow-md shadow-my-black-low/20"
              key={song._id}
            >
              <article className="flex gap-5 h-full">
                <Image
                  width={500}
                  height={500}
                  src={song.coverUrl || "/placeholder.jpg"}
                  alt="Song Image Cover"
                  className="object-cover max-w-18 sm:max-w-40 rounded-2xl hover:grayscale-75 transition-all duration-500"
                />
                <div className="flex flex-col justify-between h-full text-my-black-high dark:text-my-white-high text-sm">
                  <p className="font-bold text-xl text-my-black-max dark:text-my-white-low">
                    {song.name}
                  </p>
                  <p>Singer : {song.singer?.name || "Unknown"}</p>
                  <p>Album : {song.album?.name || "None"}</p>
                  <p>
                    Genre :{" "}
                    {song.genre?.map((g) => g.name).join(", ") || "None"}
                  </p>
                  <p>
                    Playlist :{" "}
                    {song.playlist?.map((p) => p.name).join(", ") || "None"}
                  </p>
                </div>
              </article>
              <article className="h-full flex flex-col justify-between gap-2 p-2">
                <EditBtn id={song._id} name={song.name} type="song" />
                <DeleteBtn
                  type="song"
                  id={song._id}
                  name={song.name}
                  deleteFn={deleteSong}
                />
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center">Sorry, There Is No Song</p>
      )}
    </section>
  );
}
