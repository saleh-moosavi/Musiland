"use client";

import useMusicStore from "@/store/musicStore";

export default function MusicDetail() {
  const { audioCover, audioName } = useMusicStore();
  return (
    <article className="flex items-center gap-x-3 min-w-fit group">
      <img
        src={audioCover || "/"}
        alt={audioName || "Song"}
        className="w-10 aspect-square object-cover rounded-full bg-black/40"
      />
      <p className="text-xs shrink-0 font-semibold hidden lg:block">
        {audioName || "Song Name"}
      </p>
      <p className="absolute -top-5 left-0 group-hover:visible invisible text-xs bg-white w-full font-semibold lg:hidden">
        {audioName || "Song Name"}
      </p>
    </article>
  );
}
