"use client";
import { PlayCircleIcon } from "lucide-react";
import useMusicStore from "@/store/musicStore";

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
        className="scale-150 cursor-pointer text-my-white-low"
      >
        <PlayCircleIcon />
      </button>
    );
  } else {
    return (
      <button
        onClick={handlePlaySong}
        className="w-full py-2 shadow-md shadow-my-black-low/50 dark:shadow-my-black-med/50 hover:shadow-my-black-low dark:hover:shadow-my-black-med rounded-lg text-sm cursor-pointer bg-my-white-low dark:bg-my-black-max transition-all duration-300"
      >
        Play
      </button>
    );
  }
}
