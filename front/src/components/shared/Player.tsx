"use client";
import { SkipBack, SkipForward } from "lucide-react";
import { useRef } from "react";
import PlayBtn from "./player/PlayBtn";
import VolumeBtn from "./player/VolumeBtn";
import ProgressBar from "./player/ProgressBar";
import useMusicStore from "@/store/musicStore";
import MusicDetail from "./player/MusicDetail";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const { audioSrc } = useMusicStore();

  return (
    <footer className="pb-2 fixed bottom-0 inset-x-0 z-50 max-w-[90rem] mx-5 xl:mx-auto">
      <audio
        src={
          audioSrc ||
          "https://sv2.mybia2music.com/s2/Music/1404/02/27/Reza%20Shiri/Reza%20Shiri%20-%20Fatabarak%20Allah%20[128].mp3"
        }
        ref={audioRef}
        suppressHydrationWarning
        onError={() => alert("Audio playback failed. Please try another song.")}
      ></audio>
      <section className="flex flex-col justify-between w-full gap-3 shadow-lg p-3 bg-slate-100 sticky inset-0 rounded-full">
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
            <SkipBack />
            <PlayBtn audioContext={audioRef} />
            <SkipForward />
          </div>
          <div className="flex gap-x-5 items-center justify-self-end">
            <VolumeBtn audioContext={audioRef} />
          </div>
        </article>
      </section>
    </footer>
  );
}
