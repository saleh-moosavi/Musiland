"use client";
import { SkipBack, SkipForward } from "lucide-react";
import { useEffect, useRef } from "react";
import PlayBtn from "./player/PlayBtn";
import VolumeBtn from "./player/VolumeBtn";
import ProgressBar from "./player/ProgressBar";
import useMusicStore from "@/store/musicStore";
import MusicDetail from "./player/MusicDetail";
import useSameSongsStore from "@/store/sameSongStore";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);

  const { sameSongsList } = useSameSongsStore();
  const {
    audioSrc,
    setAudioSrc,
    setAudioCover,
    setAudioName,
    setAudioGenres,
    setAudioPlaylists,
  } = useMusicStore();

  const songSetter = (song: any) => {
    setAudioSrc(song.audioUrl);
    setAudioCover(song.coverUrl);
    setAudioName(song.name);
    setAudioGenres(song.genres);
    setAudioPlaylists(song.playlists);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      const currentIndex = sameSongsList.findIndex(
        (song) => song.audioUrl === audioSrc
      );

      if (currentIndex !== -1 && currentIndex < sameSongsList.length - 1) {
        const nextSong = sameSongsList[currentIndex + 1];
        songSetter(nextSong);
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [audioSrc, sameSongsList]);

  const handlePrevSong = () => {
    const currentIndex = sameSongsList.findIndex(
      (song) => song.audioUrl === audioSrc
    );

    if (currentIndex > 0) {
      // Set the audioSrc to the previous song's audioUrl
      const song = sameSongsList[currentIndex - 1];
      songSetter(song);
    }
  };

  const handleNextSong = () => {
    const currentIndex = sameSongsList.findIndex(
      (song) => song.audioUrl === audioSrc
    );

    if (currentIndex !== -1 && currentIndex < sameSongsList.length - 1) {
      // Set the audioSrc to the next song's audioUrl
      const song = sameSongsList[currentIndex + 1];
      songSetter(song);
    }
  };

  return (
    <footer className="pb-2 fixed bottom-0 inset-x-0 z-50 max-w-[90rem] mx-5 xl:mx-auto">
      <audio
        src={audioSrc}
        ref={audioRef}
        suppressHydrationWarning
        onError={() => alert("Audio playback failed. Please try another song.")}
      ></audio>
      <section className="flex flex-col justify-between w-full gap-3 shadow-lg p-3 bg-slate-100 dark:bg-gray-800 sticky inset-0 rounded-full">
        <div className="flex gap-x-5 items-center w-full relative">
          <div className="absolute -top-5 inset-x-10">
            <ProgressBar audioContext={audioRef} />
          </div>
        </div>
        <article className="grid grid-cols-3 justify-between gap-x-5 items-center">
          <div className="flex gap-x-5 items-center">
            <MusicDetail />
          </div>
          <div className="flex gap-x-5 items-center justify-self-center">
            <SkipBack className="cursor-pointer dark:stroke-white" onClick={handlePrevSong} />
            <PlayBtn audioContext={audioRef} />
            <SkipForward className="cursor-pointer dark:stroke-white" onClick={handleNextSong} />
          </div>
          <div className="flex gap-x-5 items-center justify-self-end">
            <VolumeBtn audioContext={audioRef} />
          </div>
        </article>
      </section>
    </footer>
  );
}
