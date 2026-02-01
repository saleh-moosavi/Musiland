"use client";
import React from "react";
import Image from "next/image";
import { Heart } from "lucide-react";
import { ISong } from "@/services/song";
import PlayButton from "./PlayButton";
import useUserStore from "@/store/userStore";
import useMusicStore from "@/store/musicStore";
import useToggleLike from "@/hooks/useToggleLike";

export default function SameSongsContent({ song }: { song: ISong }) {
  const { audioSrc } = useMusicStore();
  const { likedSongs } = useUserStore();
  const { toggleLike } = useToggleLike();
  return (
    <section
      className={`flex justify-start items-center gap-2 mb-5 md:gap-10 w-full p-2 rounded-2xl overflow-hidden dark:text-my-white-low select-none transition-all duration-200 ${
        audioSrc == song.audioUrl
          ? "bg-my-white-high dark:bg-my-black-med"
          : "bg-my-white-med dark:bg-my-black-high hover:bg-my-white-high dark:hover:bg-my-black-med"
      }`}
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
          <PlayButton song={song} buttonType="ICON" />
        </p>
      </div>

      <div className="flex flex-col items-start justify-center">
        <p className="font-semibold">{song.name}</p>
        <p className="text-sm">{song.singer?.name || "Unknown Artist"}</p>
      </div>
      <Heart
        onClick={() => {
          toggleLike(song.id);
        }}
        className={`ms-auto md:me-5 cursor-pointer hover:scale-125 transition-all duration-200 ${
          likedSongs.includes(song.id)
            ? "fill-my-red-med stroke-my-red-med"
            : "stroke-my-black-med dark:stroke-my-white-high hover:fill-my-red-med hover:stroke-my-red-med"
        }`}
      />
    </section>
  );
}
