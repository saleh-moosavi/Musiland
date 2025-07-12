"use client";
import useMusicStore from "@/store/musicStore";
import { PlayCircleIcon } from "lucide-react";

export default function PlayButton({ song, icon }: any) {
  const {
    setAudioSrc,
    setAudioCover,
    setAudioName,
    setAudioGenres,
    setAudioPlaylists,
  } = useMusicStore();
  const handlePlaySong = () => {
    setAudioName(song.name);
    setAudioSrc(song.audioUrl);
    setAudioCover(song.coverUrl);
    setAudioGenres(song.genres);
    setAudioPlaylists(song.playlists);
  };

  if (icon) {
    return (
      <button
        onClick={handlePlaySong}
        className="scale-150 cursor-pointer text-white"
      >
        <PlayCircleIcon />
      </button>
    );
  } else {
    return (
      <button
        onClick={handlePlaySong}
        className="w-full py-2 shadow-md hover:shadow-gray-300 rounded-xl border-gray-400 text-sm cursor-pointer dark:bg-slate-700 dark:hover:shadow-slate-500"
      >
        Play
      </button>
    );
  }
}
