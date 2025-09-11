"use client";
import { PlayCircleIcon } from "lucide-react";
import useMusicStore from "@/store/musicStore";
import { GetSong } from "@/types/song";

export default function PlayButton({
  song,
  icon,
}: {
  song: GetSong;
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
      <button onClick={handlePlaySong} className="playdownloadbtn">
        Play
      </button>
    );
  }
}
