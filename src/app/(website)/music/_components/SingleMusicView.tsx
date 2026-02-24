import Likes from "./Likes";
import Link from "next/link";
import Image from "next/image";
import { ISong } from "@/services/song";
import { MessageSquareMore } from "lucide-react";
import PlayButton from "@/components/PlayButton";

interface IProps {
  song: ISong;
  commentCount: number;
}

export default function SingleMusicView({ song, commentCount }: IProps) {
  return (
    <div className="grid lg:grid-cols-3 items-start gap-10 w-full dark:text-my-white-low">
      <Image
        src={song.cover_url}
        alt={song.name}
        width={500}
        height={500}
        priority
        className="col-span-1 lg:w-96 object-cover rounded-3xl h-full w-full"
      />
      <section className="col-span-1 *:w-full h-full flex flex-col">
        <div className="flex flex-col justify-between h-full">
          <article className="space-y-3">
            <h3 className="font-semibold text-3xl">{song.singer?.name}</h3>
            <p className="font-semibold text-2xl">{song.name}</p>
          </article>
          <article className="space-y-2 my-5">
            <p className="font-semibold">
              Album: {song.album?.name || "Unknown"}
            </p>
            {/* genres section */}
            <ul className="font-semibold flex items-center gap-3">
              Genre :
              {song.songs_genres?.length
                ? song.songs_genres.map((g) => (
                    <li key={g.genre.id}>
                      <Link
                        href={`/category/${g.genre.name}?genre=${g.genre.name}`}
                      >
                        {g.genre.name}
                      </Link>
                    </li>
                  ))
                : "Unknown"}
            </ul>
            {/* playlist section */}
            <ul className="font-semibold flex items-center gap-3">
              Playlist :
              {song.songs_playlists?.length
                ? song.songs_playlists.map((p) => (
                    <li key={p.playlist.id}>
                      <Link
                        href={`/category/${p.playlist.name}?playlist=${p.playlist.name}`}
                      >
                        {p.playlist.name}
                      </Link>
                    </li>
                  ))
                : "Unknown"}
            </ul>
          </article>
        </div>

        <div className="space-y-5">
          <a
            download
            href={song.audio_url}
            target="_blank"
            className="playdownloadbtn"
          >
            Download
          </a>
          <PlayButton song={song} buttonType="NORMAL" />

          <div className="flex gap-5 items-center text-sm justify-between">
            <p className="flex items-center gap-2">
              {commentCount} <MessageSquareMore className="size-4" />
            </p>
            <Likes count={song.likes ?? 0} id={song.id} />
            <p>{song.created_at.split("T")[0]}</p>
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
