import PlayButton from "@/components/shared/PlayButton";
import { objectToQueryString } from "@/libs/objectToQueryString";
import Link from "next/link";

interface PropsType {
  params: { music_category: string };
  searchParams: { [key: string]: string | string[] };
}

export default async function MusicCategoryPage({
  params,
  searchParams,
}: PropsType) {
  const music_category = params.music_category;
  const decoded_music_category = decodeURIComponent(music_category);

  const stringQuery = objectToQueryString(await searchParams);
  const res = await fetch(
    `http://localhost:1337/api/songs?${stringQuery}&populate=*`
  );
  console.log(stringQuery);
  const data = await res.json();
  const songs = await data.data;
  if (!songs) {
    return (
      <div className="text-red-500 font-bold text-center mt-5">
        Song not found
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-5 text-center font-semibold text-lg">
        {decoded_music_category}
      </h2>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-start gap-10">
        {songs.map((song: any) => (
          <div className="self-start" key={song.id}>
            <div className="relative group rounded-xl overflow-hidden">
              <img
                src={song.coverUrl}
                alt={song.name}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full object-cover  h-44 bg-gray-200"
                loading="lazy"
              />
              <p className="absolute inset-0 flex justify-center items-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <PlayButton song={song} icon />
              </p>
            </div>
            <Link
              href={`/music/${song.singer.name || "Unknown"} - ${
                song.documentId
              }`}
            >
              <p className="font-semibold mt-2">{song.name}</p>
              <p className="text-sm">{song.singer.name || "Unknown Artist"}</p>
            </Link>
          </div>
        ))}
      </section>
    </>
  );
}
