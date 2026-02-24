import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ISong } from "@/services/song";
import PlayButton from "@/components/PlayButton";

interface IProp {
  songs: ISong[];
}

export default async function CategoryItems({ songs }: IProp) {
  return (
    <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 items-center justify-start gap-10">
      {songs?.map((song) => (
        <div className="self-start" key={song.id}>
          <div className="relative group rounded-xl overflow-hidden">
            <Image
              src={song.cover_url}
              alt={song.name}
              width={100}
              height={100}
              sizes="(max-width: 768px) 100vw, 50vw"
              className="w-full object-cover h-44"
              loading="lazy"
            />
            <p className="absolute inset-0 flex justify-center items-center bg-my-black-max/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <PlayButton song={song} buttonType="ICON" />
            </p>
          </div>
          <Link
            className="dark:text-my-white-low text-center"
            href={`/music/${song.singer.name || "Unknown"},${song.id}`}
          >
            <p className="font-semibold mt-2">{song.name}</p>
            <p className="text-sm">{song.singer.name || "Unknown Artist"}</p>
          </Link>
        </div>
      ))}
    </section>
  );
}
