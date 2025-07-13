import { Volume, Volume1, Volume2 } from "lucide-react";
import { useEffect, useState } from "react";
import RangeInput from "./RangeInput";

export default function VolumeBtn({
  audioContext,
}: {
  audioContext: React.MutableRefObject<HTMLAudioElement | null>;
}) {
  const [volumeVal, setVolumeVal] = useState<number>(100);
  const [isRangeInputVisible, setIsRangeInputVisible] =
    useState<boolean>(false);

  useEffect(() => {
    const savedVolume = Number(localStorage.getItem("volume"));
    setVolumeVal(savedVolume);
    if (audioContext?.current) {
      audioContext.current.volume = savedVolume / 100;
    }
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      localStorage.setItem("volume", String(volumeVal));
      if (audioContext.current) {
        audioContext.current.volume = volumeVal / 100;
      }
    }, 500); // 500ms debounce

    return () => {
      clearTimeout(handler);
    };
  }, [volumeVal]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolumeVal(newVolume);
    if (audioContext.current) {
      audioContext.current.volume = newVolume / 100;
    }
  };

  return (
    <article className="flex items-center gap-x-3 group relative">
      <div
        className="cursor-pointer"
        onClick={() => setIsRangeInputVisible(!isRangeInputVisible)}
      >
        {volumeVal === 0 ? (
          <Volume className="dark:stroke-white" />
        ) : volumeVal < 50 ? (
          <Volume1 className="dark:stroke-white" />
        ) : (
          <Volume2 className="dark:stroke-white" />
        )}
      </div>
      {isRangeInputVisible && (
        <div className="absolute box-content -top-18 -right-2 w-24 lg:w-40 bg-gray-100 dark:bg-slate-800 pb-2 px-2 rounded-full">
          <RangeInput
            progress={volumeVal}
            handleProgressChange={handleVolumeChange}
          />
        </div>
      )}
    </article>
  );
}
