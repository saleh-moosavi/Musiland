"use client";
import usePlayer from "@/hooks/usePlayer";
import VolumeBtn from "./player/VolumeBtn";
import ProgressBar from "./player/ProgressBar";
import MusicDetail from "./player/MusicDetail";
import { Pause, Play, SkipBack, SkipForward } from "lucide-react";

export default function Player() {
  const {
    audioRef,
    audioSrc,
    isPlaying,
    handlePlayPause,
    nextSong,
    previousSong,
  } = usePlayer();

  return (
    <footer className="pb-2 fixed bottom-0 inset-x-0 z-50 max-w-[90rem] mx-5 xl:mx-auto">
      <audio
        src={audioSrc}
        ref={audioRef}
        suppressHydrationWarning
        onError={() => alert("Audio playback failed. Please try another song.")}
      ></audio>
      <section className="flex flex-col justify-between w-full gap-3 shadow-md shadow-my-black-low/50 p-3 bg-my-white-low dark:bg-my-black-max sticky inset-0 rounded-2xl">
        {/******************* Handler Time *******************/}
        <ProgressBar audioContext={audioRef} />
        <article className="grid grid-cols-3 justify-between gap-x-5 items-center">
          {/******************* Music Details *******************/}
          <MusicDetail />
          {/******************* Handler Buttons *******************/}
          <div className="flex gap-x-5 items-center justify-self-center *:cursor-pointer *:dark:stroke-my-white-low *:stroke-my-black-high *:hover:stroke-my-green-med *:transition-all *:duration-300">
            <SkipBack onClick={previousSong} />
            {isPlaying ? (
              <Pause onClick={handlePlayPause} />
            ) : (
              <Play onClick={handlePlayPause} />
            )}
            <SkipForward onClick={nextSong} />
          </div>
          {/******************* Handler Volume *******************/}
          <VolumeBtn audioContext={audioRef} />
        </article>
      </section>
    </footer>
  );
}
