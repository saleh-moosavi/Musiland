"use client";
import { Heart } from "lucide-react";
import useUserStore from "@/store/userStore";
import useToastStore from "@/store/toastStore";
import { useEffect, useRef, useState } from "react";

export default function Likes({ count, id }: { count: number; id: string }) {
  const userIdRef = useRef<null | string>(null);
  const { likedSongs, setLikedSongs } = useUserStore();
  const [syncCount, setSyncCount] = useState<number | null>(null);
  const { setIsToastOpen, setToastColor, setToastTitle } = useToastStore();

  //get user id and user liked list
  useEffect(() => {
    fetch("/api/getUserData?like=true")
      .then((res) => res.json())
      .then((data) => {
        userIdRef.current = data?.user?.id;
        setLikedSongs(data.user.likedSongs);
      })
      .catch((err) => {
        setIsToastOpen(true);
        setToastColor("orange");
        setToastTitle(err);
      });
  }, []);

  //handle like button click event
  const toggleLike = async () => {
    const userId = userIdRef.current;
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/likes`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        songId: id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setSyncCount(data.newLikes);
        likedSongs.includes(id)
          ? setLikedSongs(likedSongs.filter((item) => item !== id))
          : setLikedSongs([...likedSongs, id]);
      })
      .catch((err) => {
        setIsToastOpen(true);
        setToastColor("orange");
        setToastTitle(err);
      });
  };
  return (
    <p className="flex items-center gap-2 cursor-pointer" onClick={toggleLike}>
      {syncCount !== null ? syncCount : count}
      <Heart
        className={`size-4 ${
          likedSongs.includes(id)
            ? "fill-my-red-med stroke-my-red-med"
            : "fill-my-black-low stroke-my-black-low"
        }`}
      />
    </p>
  );
}
