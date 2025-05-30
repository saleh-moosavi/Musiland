import React from "react";

export default function MusicDetail() {
  return (
    <article className="flex items-center gap-x-3 min-w-fit group">
      <img
        src="https://www.mybia2music.com/assets/thumbs/114676584_800.jpg"
        alt=""
        className="w-10 aspect-square object-cover rounded-full"
      />
      <p className="text-xs shrink-0 font-semibold hidden lg:block">
        Song Name
      </p>
      <p className="absolute -top-5 left-0 group-hover:visible invisible text-xs bg-white w-full font-semibold lg:hidden">
        Song Name
      </p>
    </article>
  );
}
