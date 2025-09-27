"use client";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import { getUserLikes } from "@/services/like";
import useToggleLike from "@/hooks/useToggleLike";
import PlayButton from "@/components/shared/PlayButton";

export default function page() {
  const { userId } = useUserStore();
  const { toggleLike } = useToggleLike();
  const [likedSongs, setLikedSongs] = useState([]);

  useEffect(() => {
    if (!userId) return;
    getUserLikes(userId).then((data) => {
      setLikedSongs(data);
    });
  }, [userId]);

  {
    return likedSongs.length > 0 ? (
      <ul className="grid lg:grid-cols-2 gap-5 w-full">
        {likedSongs.map((song: any) => {
          return (
            <li
              className="w-full flex justify-between items-center gap-5 bg-my-white-low dark:bg-my-black-max p-2 rounded-3xl shadow-md shadow-my-black-low/20"
              key={song._id}
            >
              <article className="w-full flex gap-5 h-full">
                <div className="relative group rounded-2xl overflow-hidden max-w-32">
                  <img
                    src={song.coverUrl || "/placeholder.jpg"}
                    alt={song.name}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="w-full object-cover aspect-square"
                    loading="lazy"
                  />
                  <p className="absolute inset-0 flex justify-center items-center bg-my-black-max/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <PlayButton song={song} icon />
                  </p>
                </div>
                <div className="w-full flex flex-col justify-between items-start h-full text-my-black-high dark:text-my-white-high text-sm">
                  <div className="w-full flex items-center justify-between">
                    <p className="font-bold text-xl text-my-black-max dark:text-my-white-low">
                      {song.name}
                    </p>
                    <X
                      onClick={() => {
                        toggleLike(song._id);
                      }}
                      className="md:me-5 cursor-pointer text-my-red-med hover:scale-125 transition-all duration-200"
                    />
                  </div>
                  <p>Singer : {song.singer?.name || "Unknown"}</p>
                  <p>Album : {song.album?.name || "None"}</p>
                </div>
              </article>
            </li>
          );
        })}
      </ul>
    ) : (
      <p className="text-center">You Don't Have Any Liked Songs</p>
    );
  }
}
