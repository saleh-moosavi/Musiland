"use client";
import useMusicStore from "@/store/musicStore";
import { Pause, Play } from "lucide-react";
import { useEffect, useState } from "react";

export default function PlayBtn({
  audioContext,
}: {
  audioContext: React.MutableRefObject<HTMLAudioElement | null>;
}) {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const { audioSrc } = useMusicStore();

  useEffect(() => {
    if (audioSrc) {
      handlePlayPause();
    }
  }, [audioSrc]);

  useEffect(() => {
    const audio = audioContext.current;
    if (audio) {
      const updatePlayState = () => setIsPlaying(!audio.paused);
      audio.addEventListener("play", updatePlayState);
      audio.addEventListener("pause", updatePlayState);
      return () => {
        audio.removeEventListener("play", updatePlayState);
        audio.removeEventListener("pause", updatePlayState);
      };
    }
  }, [audioContext]);

  const handlePlayPause = () => {
    const audio = audioContext.current;
    if (!audio || !audioSrc) return;

    try {
      if (audio.paused) {
        audio.play().catch((err) => {
          console.warn("Play error:", err);
          setIsPlaying(false);
          return;
        });
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return (
    <div onClick={handlePlayPause} className="cursor-pointer">
      {isPlaying ? <Pause /> : <Play />}
    </div>
  );
}
