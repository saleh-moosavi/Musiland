"use client";

import Image from "next/image";
import { useEffect } from "react";
import PlayButton from "./PlayButton";
import { ISong } from "@/models/song";
import { Heart, X } from "lucide-react";
import useUserStore from "@/store/userStore";
import { getAllSongs } from "@/services/song";
import useMusicStore from "@/store/musicStore";
import useToggleLike from "@/hooks/useToggleLike";
import { generalItems } from "@/types/generalItems";
import useSameSongsStore from "@/store/sameSongStore";

export default function SameSongs() {
  const { likedSongs } = useUserStore();
  const { toggleLike } = useToggleLike();
  const { audioSrc, audioGenres, audioPlaylists } = useMusicStore();
  const { isPanelVisible, sameSongsList, setIsPanelVisible, setSameSongsList } =
    useSameSongsStore();

  const query = `genre=${audioGenres
    .map((g: generalItems) => g.name)
    .join(",")}&playlist=${audioPlaylists
    .map((p: generalItems) => p.name)
    .join(",")}`;

  useEffect(() => {
    const fetchSongs = async () => {
      const res = await getAllSongs(query);
      const songs = res.data;
      if (songs === null) {
        setSameSongsList([]);
      } else {
        setSameSongsList(songs);
      }
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
      className={`fixed inset-0 my-20 z-[60] p-5 ${
        isPanelVisible ? "" : "hidden"
      }`}
    >
      <article className="max-w-[90rem] mx-auto w-full h-full bg-my-white-low dark:bg-my-black-max rounded-3xl px-5 pb-5 overflow-y-scroll overscroll-y-contain shadow-md shadow-my-black-med/20 dark:shadow-my-white-med/20">
        <div className="flex justify-between items-center sticky top-0 dark:text-my-white-low py-5 z-20">
          <p className="select-none font-semibold">Similar Songs</p>
          <X
            className="hover:stroke-my-red-med transition-all duration-200 cursor-pointer"
            onClick={() => setIsPanelVisible(false)}
          />
        </div>
        {sameSongsList ? (
          sameSongsList.map((song: ISong) => (
            <section
              className={`flex justify-start items-center gap-2 mb-5 md:gap-10 w-full p-2 rounded-2xl overflow-hidden dark:text-my-white-low select-none transition-all duration-200 ${
                audioSrc == song.audioUrl
                  ? "bg-my-white-high dark:bg-my-black-med"
                  : "bg-my-white-med dark:bg-my-black-high hover:bg-my-white-high dark:hover:bg-my-black-med"
              }`}
              key={song._id}
            >
              <div className="relative group rounded-xl overflow-hidden">
                <Image
                  src={song.coverUrl}
                  alt={song.name}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  width={80}
                  height={80}
                  className="w-20 object-cover aspect-square"
                  loading="lazy"
                />
                <p className="absolute inset-0 flex justify-center items-center bg-my-black-max/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <PlayButton song={song} icon />
                </p>
              </div>

              <div className="flex flex-col items-start justify-center">
                <p className="font-semibold">{song.name}</p>
                <p className="text-sm">
                  {song.singer?.name || "Unknown Artist"}
                </p>
              </div>
              <Heart
                onClick={() => {
                  toggleLike(song._id);
                }}
                className={`ms-auto md:me-5 cursor-pointer hover:scale-125 transition-all duration-200 ${
                  likedSongs.includes(song._id)
                    ? "fill-my-red-med stroke-my-red-med"
                    : "stroke-my-black-med dark:stroke-my-white-high hover:fill-my-red-med hover:stroke-my-red-med"
                }`}
              />
            </section>
          ))
        ) : (
          <p>There Is No Song Here !!!</p>
        )}
      </article>
    </div>
  );
}
