"use client";

import PlayButton from "./PlayButton";
import { Heart, X } from "lucide-react";
import { useEffect } from "react";
import useMusicStore from "@/store/musicStore";
import useSameSongsStore from "@/store/sameSongStore";

export default function SameSongs() {
  const { isPanelVisible, sameSongsList, setIsPanelVisible, setSameSongsList } =
    useSameSongsStore();
  const { audioSrc, audioGenres, audioPlaylists } = useMusicStore();

  const query = `filters[$or][0][genres][name][$in]=${audioGenres
    .map((g: any) => g.name)
    .join(",")}&filters[$or][1][playlists][name][$in]=${audioPlaylists
    .map((p: any) => p.name)
    .join(",")}`;

  useEffect(() => {
    const fetchSongs = async () => {
      const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/songs`);
      const response = await fetch(url);
      const data: any = await response.json();

      // Sort the songs to ensure the currently playing song is first
      // const songs = data.data.sort((a: any, b: any) => {
      //   if (a.audioUrl === audioSrc) return -1; // Move the currently playing song to the front
      //   if (b.audioUrl === audioSrc) return 1; // Keep other songs in their order
      //   return 0; // Maintain original order for other songs
      // });

      setSameSongsList(data);
    };
    if (
      sameSongsList?.length < 1 ||
      sameSongsList[sameSongsList?.length - 1]?.audioUrl === audioSrc
    ) {
      fetchSongs();
    }
  }, [audioSrc, audioGenres, audioPlaylists]);

  return (
    <div
      className={`fixed inset-0 my-20 z-30 p-5 ${
        isPanelVisible ? "" : "hidden"
      }`}
    >
      <article className="max-w-[90rem] mx-auto w-full h-full bg-gray-200 dark:bg-gray-800 rounded-3xl px-5 pb-5 overflow-y-scroll overscroll-y-contain shadow-md outline-gray-300 dark:outline-gray-400 outline-1">
        <div className="flex justify-between items-center sticky top-0 bg-gray-200 dark:bg-gray-800 dark:text-white py-5 z-20">
          <p className="select-none font-semibold">Similar Songs</p>
          <X
            className="hover:stroke-red-600 transition-all duration-200 cursor-pointer"
            onClick={() => setIsPanelVisible(false)}
          />
        </div>
        {sameSongsList ? (
          sameSongsList.map((song: any) => (
            <section
              className={`flex justify-start items-center gap-2 mb-5 md:gap-10 w-full p-2 rounded-2xl overflow-hidden hover:bg-gray-100 dark:hover:bg-gray-400 dark:text-white select-none transition-all duration-200 ${
                audioSrc == song.audioUrl
                  ? "bg-gray-300 dark:bg-gray-600"
                  : "bg-white dark:bg-gray-500"
              }`}
              key={song._id}
            >
              <div className="relative group rounded-xl overflow-hidden">
                <img
                  src={song.coverUrl}
                  alt={song.name}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="w-20 object-cover aspect-square"
                  loading="lazy"
                />
                <p className="absolute inset-0 flex justify-center items-center bg-black/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <PlayButton song={song} icon />
                </p>
              </div>

              <div className="flex flex-col items-start justify-center">
                <p className="font-semibold">{song.name}</p>
                <p className="text-sm">
                  {song.singer?.name || "Unknown Artist"}
                </p>
              </div>
              <Heart className="ms-auto md:me-5 cursor-pointer stroke-gray-400 dark:stroke-gray-200 hover:fill-red-400 hover:stroke-red-400 hover:scale-125 transition-all duration-200" />
            </section>
          ))
        ) : (
          <p>There Is No Song Here !!!</p>
        )}
      </article>
    </div>
  );
}
