"use client";

export default function RangeInput({
  progress,
  handleProgressChange,
}: {
  progress: number;
  handleProgressChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="range"
      min="0"
      max="100"
      value={progress}
      onChange={handleProgressChange}
      style={{
        background: `linear-gradient(to right, #a21caf 0%, #a21caf ${Math.round(
          progress
        )}%, #e5e7eb ${progress}%, #e5e7eb 100%)`,
      }}
      className="w-full h-1 appearance-none rounded outline-none
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-3
    [&::-webkit-slider-thumb]:h-3
    [&::-webkit-slider-thumb]:bg-purple-600
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:cursor-pointer
    [&::-moz-range-thumb]:w-3
    [&::-moz-range-thumb]:h-3
    [&::-moz-range-thumb]:bg-purple-600
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:cursor-pointer
    cursor-pointer
  "
    />
  );
}
