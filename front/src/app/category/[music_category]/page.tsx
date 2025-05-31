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
  const res = await fetch(
    `http://localhost:1337/api/songs?${searchParams}&populate=*`
  );
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
          <Link
            className="self-start"
            key={song.id}
            href={`/music/${song.singer.name || "Unknown"} - ${
              song.documentId
            }`}
          >
            <img
              src={song.coverUrl}
              alt={song.name}
              className="w-full object-cover rounded-xl h-44 bg-gray-200"
              loading="lazy"
            />
            <p className="font-semibold mt-2">{song.name}</p>
            <p className="text-sm">{song.singer.name || "Unknown Artist"}</p>
          </Link>
        ))}
      </section>
    </>
  );
}
