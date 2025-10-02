import useUserStore from "@/store/userStore";
import useSongStore from "@/store/songStore";
import { likeToggler } from "@/services/like";
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
    try {
      const data = await likeToggler(userId, songId);
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
    } catch {
      (err: string) => {
        setIsToastOpen(true);
        setToastColor("orange");
        setToastTitle(err || "Error");
      };
    }
  };

  return {
    toggleLike,
    likesCount,
    likedSongs,
  };
}
