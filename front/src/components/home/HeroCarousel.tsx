import Link from "next/link";
import Image from "next/image";
import { getAllSongs } from "@/services/song";
import HeroCarouselWrapper from "./HeroCarouselWrapper";

export default async function HeroCarousel() {
  const songs = await getAllSongs("page=1,10&sort=date");

  return (
    <HeroCarouselWrapper>
      {songs.map((song) => (
        <Link
          href={`/music/${song.singer?.name || "Unknown"}-${song._id}`}
          key={song._id}
        >
          <div className="flex flex-col gap-2 absolute bottom-5 left-1/2 -translate-x-1/2 text-my-white-low text-center bg-my-black-max/50 px-2 py-1 rounded-xl">
            <p>{song.singer?.name || "Unknown Artist"}</p>
            <p>{song.name}</p>
          </div>
          <Image
            src={song.coverUrl}
            alt={song.name}
            sizes="(max-width: 768px) 100vw, 50vw"
            width={100}
            height={100}
            className="object-cover rounded-3xl w-full h-86"
            loading="lazy"
          />
        </Link>
      ))}
    </HeroCarouselWrapper>
  );
}
