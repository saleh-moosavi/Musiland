import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ISong } from "@/types/song";
import PlayButton from "../shared/PlayButton";
import { getAllSongs } from "@/services/song";

export default async function CategoryViewPage({
  query,
  title,
}: {
  query: string;
  title: string;
}) {
  const res = await getAllSongs(query);
  const songs = res.data;

  if (songs?.length < 1 || !Array.isArray(songs)) {
    return (
      <div className="text-my-red-med font-bold text-center mt-5">
        Song not found
      </div>
    );
  }

  return (
    <>
      <h2 className="mb-5 text-center font-semibold text-lg dark:text-my-white-low">
        {title.toLocaleLowerCase().includes("song") ? title : title + " Songs"}
      </h2>
      <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-center justify-start gap-10">
        {songs?.map((song: ISong) => (
          <div className="self-start" key={song._id}>
            <div className="relative group rounded-xl overflow-hidden">
              <Image
                src={song.coverUrl}
                alt={song.name}
                width={100}
                height={100}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="w-full object-cover h-44"
                loading="lazy"
              />
              <p className="absolute inset-0 flex justify-center items-center bg-my-black-max/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <PlayButton song={song} icon />
              </p>
            </div>
            <Link
              className="dark:text-my-white-low"
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
