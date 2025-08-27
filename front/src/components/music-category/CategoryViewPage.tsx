import React from "react";
import Link from "next/link";
import PlayButton from "../shared/PlayButton";

export default async function CategoryViewPage({ query, title }: any) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/songs?${query}`);
  const songs = await res.json();

  if (songs.length < 1) {
    return (
      <div className="text-red-500 font-bold text-center mt-5">
        Song not found
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-5 text-center font-semibold text-lg dark:text-white">
        {title.toLocaleLowerCase().includes("song") ? title : title + " Songs"}
      </h2>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-start gap-10">
        {songs.map((song: any) => (
          <div className="self-start" key={song._id}>
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
              className="dark:text-white"
              href={`/music/${song.singer.name || "Unknown"}-${song._id}`}
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
