import Link from "next/link";
import Button from "@/components/shared/Button";
import EditBtn from "@/components/admin/EditBtn";
import DeleteBtn from "@/components/admin/DeleteBtn";

export default async function SongList() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/songs`, {
    cache: "no-store", // Ensure fresh data
  });
  const songs = await data.json();

  return (
    <section className="h-full w-full flex flex-col justify-start gap-10">
      <Link href="/admin/dashboard/song/add" className="w-fit self-end">
        <Button text="Song" type="button" />
      </Link>
      {songs.length > 0 ? (
        <ul className="grid grid-cols-2 gap-5 w-full">
          {songs.map((song: any) => (
            <li
              className="w-full flex justify-between items-center gap-5 bg-white p-2 rounded-3xl"
              key={song._id}
            >
              <article className="flex gap-5 h-full">
                <img
                  src={song.coverUrl || "/placeholder.jpg"} // Fallback image
                  alt="Song Image Cover"
                  className="object-cover max-w-40 rounded-2xl"
                />
                <div className="flex flex-col justify-between h-full">
                  <p className="font-bold text-xl">{song.name}</p>
                  <p className="text-sm text-gray-600">
                    Singer: {song.singer?.name || "Unknown"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Album: {song.album?.name || "None"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Genres:{" "}
                    {song.genres?.map((g: any) => g.name).join(", ") || "None"}
                  </p>
                  <p className="text-sm text-gray-600">
                    Playlists:{" "}
                    {song.playlists?.map((p: any) => p.name).join(", ") ||
                      "None"}
                  </p>
                </div>
              </article>
              <article className="h-full flex flex-col justify-between gap-2 p-2">
                <EditBtn id={song._id} name={song.name} type="song" />
                <DeleteBtn id={song._id} name={song.name} type="song" />
              </article>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-center dark:text-white">Sorry, there are no songs</p>
      )}
    </section>
  );
}
