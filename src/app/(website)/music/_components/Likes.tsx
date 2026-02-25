"use client";
import { useEffect } from "react";
import { Heart } from "lucide-react";
import useToast from "@/hooks/useToast";
import useUserStore from "@/store/userStore";
import {
  useGetUserLikedSongs,
  useToggleLike,
} from "@/hooks/ReactQuery/useLike";

export default function Likes({ count, id }: { count: number; id: string }) {
  const { showToast } = useToast();
  const { userData } = useUserStore();
  const toggleLike = useToggleLike();
  const { data: likedSongs } = useGetUserLikedSongs(id);
  const likedSongIds = likedSongs?.data?.map((song) => song.id);

  //get user id and user liked list
  useEffect(() => {
    if (!userData) {
      showToast("You need to be logged in to like a song", "orange");
    }
  }, [userData]);

  return (
    <p
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => {
        if (userData?.id)
          toggleLike.mutate({ userId: userData?.id, songId: id });
      }}
    >
      {count}
      <Heart
        className={`size-4 ${
          likedSongIds && likedSongIds.includes(id)
            ? "fill-my-red-med stroke-my-red-med"
            : "fill-my-black-low stroke-my-black-low"
        }`}
      />
    </p>
  );
}
