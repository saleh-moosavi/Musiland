"use client";
import { ChangeEvent } from "react";

export default function RangeInput({
  progress,
  handleProgressChange,
}: {
  progress: number;
  handleProgressChange: (e: ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <input
      type="range"
      min="0"
      max="100"
      value={progress}
      onChange={handleProgressChange}
      style={{
        background: `linear-gradient(to right, #00d492 0%, #00d492 ${Math.round(
          progress
        )}%, #ced4da ${progress}%, #ced4da 100%)`,
      }}
      className="w-full h-1 appearance-none rounded outline-none
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-3
    [&::-webkit-slider-thumb]:h-3
    [&::-webkit-slider-thumb]:bg-my-green-med
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:cursor-pointer
    [&::-moz-range-thumb]:w-3
    [&::-moz-range-thumb]:h-3
    [&::-moz-range-thumb]:bg-my-green-med
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:cursor-pointer
    cursor-pointer
  "
    />
  );
}
