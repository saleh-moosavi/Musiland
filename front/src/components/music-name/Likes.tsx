"use client";
import { Heart } from "lucide-react";
import PopUpStore from "@/store/popUpStore";
import { useEffect, useRef, useState } from "react";

export default function Likes({ count, id }: { count: number; id: string }) {
  const userIdRef = useRef<null | string>(null);
  const [syncCount, setSyncCount] = useState<number | null>(null);
  const {} = PopUpStore();

  useEffect(() => {
    fetch("/api/getUserData")
      .then((res) => res.json())
      .then((data) => (userIdRef.current = data?.user?.id))
      .catch((err) => console.log(err));
  }, []);

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
      .then((data) => setSyncCount(data.newLikes))
      .catch((err) => console.log(err));
  };
  return (
    <p className="flex items-center gap-2 cursor-pointer" onClick={toggleLike}>
      {syncCount !== null ? syncCount : count}
      <Heart className="size-4 fill-my-red-med stroke-my-red-med" />
    </p>
  );
}
