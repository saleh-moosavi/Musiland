"use client";
import { ISong } from "@/models/song";
import { PlayCircleIcon } from "lucide-react";
import useMusicStore from "@/store/musicStore";

export default function PlayButton({
  song,
  icon,
}: {
  song: ISong;
  icon?: boolean;
}) {
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
    setAudioGenres(song.genre);
    setAudioPlaylists(song.playlist);
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
      <button onClick={handlePlaySong} className="playdownloadbtn">
        Play
      </button>
    );
  }
}
