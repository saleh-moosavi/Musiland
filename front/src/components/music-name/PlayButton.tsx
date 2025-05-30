"use client";
import useMusicStore from "@/store/musicStore";

export default function PlayButton({ audio }: any) {
  const { setAudioSrc } = useMusicStore();
  const handlePlaySong = () => {
    setAudioSrc(audio);
  };

  return (
    <button
      onClick={handlePlaySong}
      className="w-full py-2 border rounded-xl border-gray-400 text-sm cursor-pointer"
    >
      Play
    </button>
  );
}
