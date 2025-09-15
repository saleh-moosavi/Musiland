import useUserStore from "@/store/userStore";
import useSongStore from "@/store/songStore";
import useToastStore from "@/store/toastStore";

export default function useToggleLike() {
  const { setLikesCount, likesCount } = useSongStore();
  const { likedSongs, setLikedSongs, userId } = useUserStore();
  const { setIsToastOpen, setToastColor, setToastTitle } = useToastStore();

  const toggleLike = async (songId: string) => {
    if (!userId) {
      setIsToastOpen(true);
      setToastColor("orange");
      setToastTitle("Please Login First");
      return;
    }
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/likes`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId,
        songId,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok === true) {
          setLikesCount(data.newLikes);
          likedSongs.includes(songId)
            ? setLikedSongs(likedSongs.filter((item) => item !== songId))
            : setLikedSongs([...likedSongs, songId]);
        } else {
          setIsToastOpen(true);
          setToastColor("orange");
          setToastTitle(data.error || "Error");
        }
      })
      .catch((err) => {
        setIsToastOpen(true);
        setToastColor("orange");
        setToastTitle(err || "Error");
      });
  };

  return {
    toggleLike,
    likesCount,
    likedSongs,
  };
}
