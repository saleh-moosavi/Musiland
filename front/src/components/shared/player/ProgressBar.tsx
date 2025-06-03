import { useEffect, useState } from "react";
import RangeInput from "./RangeInput";
import useSameSongsStore from "@/store/sameSongStore";

export default function ProgressBar({
  audioContext,
}: {
  audioContext: React.MutableRefObject<HTMLAudioElement | null>;
}) {
  const [progress, setProgress] = useState(0);
  const { sameSongsList } = useSameSongsStore();

  useEffect(() => {
    const audio = audioContext.current;
    if (audio) {
      const updateProgress = () => {
        setProgress((audio.currentTime / audio.duration) * 100 || 0);
      };
      audio.addEventListener("timeupdate", updateProgress);
      return () => audio.removeEventListener("timeupdate", updateProgress);
    }
  }, []);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioContext.current;
    if (!audio) return;

    audio.muted = true;

    audio.currentTime = (Number(e.target.value) / 100) * audio.duration;

    if (audio.paused) {
      audio.play();
    }

    setTimeout(() => {
      if (audio) {
        audio.muted = false;
      }
    }, 250);
  };

  return (
    <RangeInput
      progress={progress}
      handleProgressChange={handleProgressChange}
    />
  );
}
