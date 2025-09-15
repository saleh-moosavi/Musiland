"use client";
import { useEffect } from "react";
import { Heart } from "lucide-react";
import useToastStore from "@/store/toastStore";
import useAuthCheck from "@/hooks/useAuthCheck";
import useToggleLike from "@/hooks/useToggleLike";

export default function Likes({ count, id }: { count: number; id: string }) {
  const { toggleLike, likesCount } = useToggleLike();
  const { likedSongs, isLoading, userData, error } = useAuthCheck(true);
  const { setIsToastOpen, setToastColor, setToastTitle } = useToastStore();

  //get user id and user liked list
  useEffect(() => {
    if (isLoading) return;

    if (!userData) {
      setIsToastOpen(true);
      setToastColor("orange");
      setToastTitle(error || "Error");
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
