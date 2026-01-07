import Likes from "./Likes";
import Link from "next/link";
import Image from "next/image";
import PlayButton from "../shared/PlayButton";
import { MessageSquareMore } from "lucide-react";
import { ISong } from "@/models/song";
import { IGenre } from "@/models/genre";
import { IPlaylist } from "@/models/playlist";

export default function SingleMusicView({
  song,
  commentCount,
}: {
  song: ISong;
  commentCount: number;
}) {
  if (!song) {
    return (
      <div className="text-my-red-med font-bold text-center mt-5">
        Song Not Found!
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 items-start gap-10 w-full dark:text-my-white-low">
      <Image
        src={song.coverUrl}
        alt={song.name}
        width={500}
        height={500}
        priority
        className="col-span-1 lg:w-96 object-cover rounded-3xl h-full w-full"
      />
      <section className="col-span-1 flex flex-col *:w-full h-full justify-between items-start">
        <div className="space-y-2">
          <h3 className="font-semibold text-3xl">{song.singer?.name}</h3>
          <p className="font-semibold">{song.name}</p>
          <p className="font-semibold">
            Album: {song.album?.name || "Unknown"}
          </p>
          {/* genres section */}
          <ul className="font-semibold my-10 flex items-center gap-3">
            Genre :
            {song.genre?.length
              ? song.genre.map((g: IGenre) => (
                  <li key={g._id}>
                    <Link href={`/category/${g.name}?genre=${g.name}`}>
                      {g.name}
                    </Link>
                  </li>
                ))
              : "Unknown"}
          </ul>
          {/* playlist section */}
          <ul className="font-semibold my-10 flex items-center gap-3">
            Playlist :
            {song.playlist?.length
              ? song.playlist.map((p: IPlaylist) => (
                  <li key={p._id}>
                    <Link href={`/category/${p.name}?playlist=${p.name}`}>
                      {p.name}
                    </Link>
                  </li>
                ))
              : "Unknown"}
          </ul>
        </div>

        <div className="space-y-5">
          <a
            download
            href={song.audioUrl}
            target="_blank"
            className="playdownloadbtn"
          >
            Download
          </a>
          <PlayButton song={song} />

          <div className="flex gap-5 items-center text-sm justify-between">
            <p className="flex items-center gap-2">
              {commentCount} <MessageSquareMore className="size-4" />
            </p>
            <Likes count={song.likes} id={song._id} />
            <p>{song.createdAt.split("T")[0]}</p>
          </div>
        </div>
      </section>

      <div className="col-span-1">
        <h3 className="font-semibold text-lg">Song Lyrics : </h3>
        {song.lyric ? (
          <p className="text-sm font-semibold overflow-y-scroll max-h-96">
            {song.lyric}
          </p>
        ) : (
          <p className="text-sm font-semibold">No lyrics available</p>
        )}
      </div>
    </div>
  );
}
