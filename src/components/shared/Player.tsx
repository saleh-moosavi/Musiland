"use client";
import PlayBtn from "./player/PlayBtn";
import { useEffect, useRef } from "react";
import VolumeBtn from "./player/VolumeBtn";
import ProgressBar from "./player/ProgressBar";
import useMusicStore from "@/store/musicStore";
import MusicDetail from "./player/MusicDetail";
import { SkipBack, SkipForward } from "lucide-react";
import useSameSongsStore from "@/store/sameSongStore";
import { ISong } from "@/types/song";

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

  const songSetter = (song: ISong) => {
    setAudioSrc(song.audioUrl);
    setAudioCover(song.coverUrl);
    setAudioName(song.name);
    setAudioGenres(song.genre);
    setAudioPlaylists(song.playlist);
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
      <section className="flex flex-col justify-between w-full gap-3 shadow-md shadow-my-black-low/50 p-3 bg-my-white-low dark:bg-my-black-max sticky inset-0 rounded-2xl">
        <div className="flex gap-x-5 items-center w-full relative">
          <div className="absolute -top-5 inset-x-10">
            <ProgressBar audioContext={audioRef} />
          </div>
        </div>
        <article className="grid grid-cols-3 justify-between gap-x-5 items-center">
          <div className="flex gap-x-5 items-center">
            <MusicDetail />
          </div>
          <div className="flex gap-x-5 items-center justify-self-center *:cursor-pointer *:dark:stroke-my-white-low *:stroke-my-black-high *:hover:stroke-my-green-med *:transition-all *:duration-300">
            <SkipBack onClick={handlePrevSong} />
            <PlayBtn audioContext={audioRef} />
            <SkipForward onClick={handleNextSong} />
          </div>
          <div className="flex gap-x-5 items-center justify-self-end">
            <VolumeBtn audioContext={audioRef} />
          </div>
        </article>
      </section>
    </footer>
  );
}
