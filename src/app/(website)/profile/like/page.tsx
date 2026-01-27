"use client";
import Image from "next/image";
import { X } from "lucide-react";
import { ISong } from "@/services/song";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import { getUserLikes } from "@/services/like";
import PlayButton from "@/components/PlayButton";
import useToggleLike from "@/hooks/useToggleLike";

const LikedSongsPage: React.FC = () => {
  const { userData } = useUserStore();
  const { toggleLike } = useToggleLike();
  const [songs, setSongs] = useState<ISong[]>([]);

  useEffect(() => {
    if (!userData) return;
    getUserLikes(userData.id)
      .then((res) => setSongs(res.data || []))
      .catch((err) => console.error(err));
  }, [userData]);

  if (songs.length === 0) {
    return <p>You Have No Liked Songs</p>;
  } else {
    return (
      <ul className="grid lg:grid-cols-2 gap-5 w-full">
        {songs.map((song) => (
          <li
            key={song._id}
            className="w-full flex justify-between items-center gap-5 bg-my-white-low dark:bg-my-black-max p-2 rounded-3xl shadow-md shadow-my-black-low/20"
          >
            <article className="w-full flex gap-5 h-full">
              <div className="relative group rounded-2xl overflow-hidden max-w-32">
                <Image
                  src={song.coverUrl || "/placeholder.jpg"}
                  alt={song.name}
                  className="w-full object-cover aspect-square"
                  width={100}
                  height={100}
                />
                <div className="absolute inset-0 flex justify-center items-center bg-my-black-max/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <PlayButton song={song} buttonType="ICON" />
                </div>
              </div>
              <div className="w-full flex flex-col justify-between text-sm">
                <div className="w-full flex items-center justify-between">
                  <p className="font-bold text-xl">{song.name}</p>
                  <X
                    onClick={() => {
                      toggleLike(song._id);
                      setSongs((prev) =>
                        prev.filter((s) => s._id !== song._id)
                      );
                    }}
                    className="md:me-5 cursor-pointer text-my-red-med hover:scale-125 transition-all duration-200"
                  />
                </div>
                <p>Singer: {song.singer?.name || "Unknown"}</p>
                <p>Album: {song.album?.name || "None"}</p>
              </div>
            </article>
          </li>
        ))}
      </ul>
    );
  }
};

export default LikedSongsPage;
