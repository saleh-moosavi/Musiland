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
        className={`cursor-pointer ${
          isRangeInputVisible
            ? "*:stroke-my-green-med"
            : "*:dark:stroke-my-white-low"
        }`}
        onClick={() => setIsRangeInputVisible(!isRangeInputVisible)}
      >
        {volumeVal === 0 ? (
          <Volume />
        ) : volumeVal < 50 ? (
          <Volume1 />
        ) : (
          <Volume2 />
        )}
      </div>
      {isRangeInputVisible && (
        <div className="absolute box-content -top-18 -right-2 w-24 lg:w-40 bg-my-white-low dark:bg-my-black-max pb-2 px-2 rounded-lg shadow shadow-my-black-low dark:shadow-my-black-low">
          <RangeInput
            progress={volumeVal}
            handleProgressChange={handleVolumeChange}
          />
        </div>
      )}
    </article>
  );
}
