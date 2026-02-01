"use client";
import { ISong } from "@/services/song";
import { PlayCircleIcon } from "lucide-react";
import useMusicStore from "@/store/musicStore";
import { ComponentProps, ReactNode } from "react";

interface IProps extends ComponentProps<"button"> {
  song: ISong;
  children?: ReactNode;
  buttonType?: "ICON" | "NORMAL";
}

export default function PlayButton({ song, children, buttonType }: IProps) {
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
    setAudioGenres(song.songs_genres);
    setAudioPlaylists(song.songs_playlists);
  };
  if (buttonType === "ICON") {
    return (
      <button
        className="scale-150 cursor-pointer text-my-white-low"
        onClick={handlePlaySong}
      >
        <PlayCircleIcon />
      </button>
    );
  } else if (buttonType === "NORMAL") {
    return (
      <button
        className="w-full text-center inline-block py-2 shadow-md shadow-my-black-low/50 dark:shadow-my-black-med/50 hover:shadow-my-black-low dark:hover:shadow-my-black-med rounded-lg text-sm cursor-pointer bg-my-white-low dark:bg-my-black-max transition-all duration-300"
        onClick={handlePlaySong}
      >
        Play
      </button>
    );
  } else {
    return <button onClick={handlePlaySong}>{children}</button>;
  }
}
