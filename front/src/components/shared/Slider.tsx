import Link from "next/link";
import Image from "next/image";
import PlayButton from "./PlayButton";
import { GetSong } from "@/types/song";
import SliderWrapper from "./SliderWrapper";

export default async function Slider({
  title,
  query,
}: {
  title: string;
  query: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/songs?${query}&page=1,10`
  );
  if (!response.ok) {
    throw new Error("Failed to fetch Slider Songs");
  }
  const songs: GetSong[] = await response.json();

  return (
    <>
      <section className="flex items-center w-full gap-5 dark:text-my-white-low dark:border-my-white-low">
        <p className="shrink-0 text-sm font-semibold">{title}</p>
        <span className="w-full shrink h-[1px] translate-y-full dark:bg-my-white-low bg-my-black-low"></span>
        <Link
          href={`/category/${title}?${query}&sort=date`}
          className="border dark:hover:border-my-green-med dark:hover:text-my-green-med hover:text-my-green-high hover:border-my-green-high  px-4 py-1 rounded-lg shrink-0 cursor-pointer transition-all duration-300"
        >
          See More
        </Link>
      </section>
      <SliderWrapper>
        {songs.map((song) => (
          <article key={song._id}>
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
              <p className="absolute inset-0 flex justify-center items-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <PlayButton song={song} icon />
              </p>
            </div>
            <Link
              className="group dark:text-white"
              href={`/music/${song.singer?.name}-${song._id}`}
            >
              <p className="font-semibold mt-2">{song.name}</p>
              <p className="text-sm">{song.singer?.name || "Unknown Artist"}</p>
            </Link>
          </article>
        ))}
      </SliderWrapper>
    </>
  );
}
