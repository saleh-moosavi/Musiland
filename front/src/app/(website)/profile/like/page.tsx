"use client";
import { X } from "lucide-react";
import { GetSong } from "@/types/song";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import { getUserLikes } from "@/services/like";
import useToggleLike from "@/hooks/useToggleLike";
import PlayButton from "@/components/shared/PlayButton";

const LikedSongsPage: React.FC = () => {
  const { userId } = useUserStore();
  const { toggleLike } = useToggleLike();
  const [loading, setLoading] = useState(true);
  const [songs, setSongs] = useState<GetSong[]>([]);

  useEffect(() => {
    if (!userId) return;
    getUserLikes(userId)
      .then((res) => setSongs(res.data || []))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, [userId]);

  if (loading) return <p className="text-center">Loading...</p>;

  if (songs.length === 0)
    return <p className="text-center">You Don't Have Any Liked Songs</p>;

  return (
    <ul className="grid lg:grid-cols-2 gap-5 w-full">
      {songs.map((song) => (
        <li
          key={song._id}
          className="w-full flex justify-between items-center gap-5 bg-my-white-low dark:bg-my-black-max p-2 rounded-3xl shadow-md shadow-my-black-low/20"
        >
          <article className="w-full flex gap-5 h-full">
            <div className="relative group rounded-2xl overflow-hidden max-w-32">
              <img
                src={song.coverUrl || "/placeholder.jpg"}
                alt={song.name}
                className="w-full object-cover aspect-square"
                loading="lazy"
              />
              <div className="absolute inset-0 flex justify-center items-center bg-my-black-max/30 opacity-0 group-hover:opacity-100 transition-all duration-300">
                <PlayButton song={song} icon />
              </div>
            </div>
            <div className="w-full flex flex-col justify-between text-sm">
              <div className="w-full flex items-center justify-between">
                <p className="font-bold text-xl">{song.name}</p>
                <X
                  onClick={() => {
                    toggleLike(song._id);
                    setSongs((prev) => prev.filter((s) => s._id !== song._id));
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
};

export default LikedSongsPage;
