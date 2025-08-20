"use client";

import useMusicStore from "@/store/musicStore";
import useSameSongsStore from "@/store/sameSongStore";

export default function MusicDetail() {
  const { audioCover, audioName } = useMusicStore();
  const { isPanelVisible, setIsPanelVisible } = useSameSongsStore();
  const togglePanel = () => {
    setIsPanelVisible(!isPanelVisible);
  };
  return (
    <article className="flex items-center gap-x-3 min-w-fit group">
      {audioCover ? (
        <img
          src={audioCover}
          alt={audioName || "Song"}
          onClick={togglePanel}
          className="w-10 aspect-square object-cover rounded-full cursor-pointer"
        />
      ) : (
        <div className="w-10 aspect-square object-cover rounded-full bg-gradient-to-br from-gray-200 to-gray-500"></div>
      )}
      <p className="absolute top-8 left-16 px-2 py-1 -translate-x-1/4 group-hover:translate-x-0 opacity-0 group-hover:opacity-100 text-xs bg-gray-600 w-fit font-semibold text-white rounded-lg transition-all duration-300">
        {audioName || "Song Name"}
      </p>
    </article>
  );
}
