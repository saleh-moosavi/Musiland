"use client";
import { useEffect } from "react";
import { Heart } from "lucide-react";
import useToast from "@/hooks/useToast";
import useUserStore from "@/store/userStore";
import useToggleLike from "@/hooks/useToggleLike";
import { useGetUserLikedSongs } from "@/hooks/ReactQuery/useUser";

export default function Likes({ count, id }: { count: number; id: string }) {
  const { showToast } = useToast();
  const { userData } = useUserStore();
  const { data: likedSongs } = useGetUserLikedSongs(id);
  const { toggleLike, likesCount } = useToggleLike();

  //get user id and user liked list
  useEffect(() => {
    if (!userData) {
      showToast("You need to be logged in to like a song", "orange");
    }
  }, [userData]);

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
