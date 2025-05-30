import { useEffect, useState } from "react";
import RangeInput from "./RangeInput";

export default function ProgressBar({
  audioContext,
}: {
  audioContext: React.MutableRefObject<HTMLAudioElement | null>;
}) {
  const [progress, setProgress] = useState(0);

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
    if (audioContext.current) {
      audioContext.current.currentTime =
        (Number(e.target.value) / 100) * audioContext.current.duration;
    }
    audioContext.current?.play();
  };
  return (
    <RangeInput
      progress={progress}
      handleProgressChange={handleProgressChange}
    />
  );
}
