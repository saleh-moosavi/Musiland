import { Volume, Volume1, Volume2 } from "lucide-react";
import { useState } from "react";
import RangeInput from "./RangeInput";

export default function VolumeBtn({
  audioContext,
}: {
  audioContext: React.MutableRefObject<HTMLAudioElement | null>;
}) {
  const [volumeVal, setVolumeVal] = useState<number>(100);
  const [isRangeInputVisible, setIsRangeInputVisible] =
    useState<boolean>(false);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = Number(e.target.value);
    setVolumeVal(newVolume);
    if (audioContext.current) {
      audioContext.current.volume = newVolume / 100;
    }
  };

  return (
    <article className="flex items-center gap-x-3 group relative">
      <div className="cursor-pointer" onClick={() => setIsRangeInputVisible(!isRangeInputVisible)}>
        {volumeVal === 0 ? (
          <Volume />
        ) : volumeVal < 50 ? (
          <Volume1 />
        ) : (
          <Volume2 />
        )}
      </div>
      {isRangeInputVisible && (
        <div className="absolute border border-purple-200 box-content -top-18 -right-2 w-24 lg:w-40 bg-gray-100 pb-2 px-2 rounded-full">
          <RangeInput
            progress={volumeVal}
            handleProgressChange={handleVolumeChange}
          />
        </div>
      )}
    </article>
  );
}
