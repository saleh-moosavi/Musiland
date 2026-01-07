"use client";

import useMusicStore from "@/store/musicStore";
import useSameSongsStore from "@/store/sameSongStore";
import Image from "next/image";

export default function MusicDetail() {
  const { audioCover, audioName } = useMusicStore();
  const { isPanelVisible, setIsPanelVisible } = useSameSongsStore();
  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };
  return (
    <article className="flex items-center gap-x-3 min-w-fit group">
      {audioCover ? (
        <Image
          src={audioCover}
          alt={audioName || "Song"}
          onClick={togglePanel}
          width={100}
          height={100}
          className="w-10 aspect-square object-cover rounded-lg cursor-pointer"
        />
      ) : (
        <div className="w-10 aspect-square object-cover rounded-lg bg-gradient-to-br from-my-black-high to-my-black-low "></div>
      )}
      <p className="absolute top-8 left-16 px-2 py-1 -translate-x-1/4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 text-xs bg-my-black-med w-fit font-semibold text-my-white-low rounded-md transition-all duration-300">
        {audioName || "Song Name"}
      </p>
    </article>
  );
}
