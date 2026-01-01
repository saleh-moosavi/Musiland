"use client";
import { useEffect } from "react";
import { Heart } from "lucide-react";
import useToast from "@/hooks/useToast";
import useAuthCheck from "@/hooks/useAuthCheck";
import useToggleLike from "@/hooks/useToggleLike";

export default function Likes({ count, id }: { count: number; id: string }) {
  const { showToast } = useToast();
  const { toggleLike, likesCount } = useToggleLike();
  const { likedSongs, isLoading, userData } = useAuthCheck(true);

  //get user id and user liked list
  useEffect(() => {
    if (isLoading) return;

    if (!userData) {
      showToast("You need to be logged in to like a song", "orange");
    }
  }, [isLoading, userData]);

  return (
    <p
      className="flex items-center gap-2 cursor-pointer"
      onClick={() => toggleLike(id)}
    >
      {typeof likesCount === "number" ? likesCount : count}
      <Heart
        className={`size-4 ${
          likedSongs && likedSongs.includes(id)
            ? "fill-my-red-med stroke-my-red-med"
            : "fill-my-black-low stroke-my-black-low"
        }`}
      />
    </p>
  );
}
