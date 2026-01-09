import useToast from "./useToast";
import useUserStore from "@/store/userStore";
import useSongStore from "@/store/songStore";
import { likeToggler } from "@/services/like";

export default function useToggleLike() {
  const { showToast } = useToast();
  const { setLikesCount, likesCount } = useSongStore();
  const { likedSongs, setLikedSongs, userId } = useUserStore();

  const toggleLike = async (songId: string) => {
    if (!userId) return showToast("Please Login First");

    try {
      const res = await likeToggler(userId, songId);
      setLikesCount(res.data);
      const updated = likedSongs.includes(songId)
        ? likedSongs.filter((id) => id !== songId)
        : [...likedSongs, songId];
      setLikedSongs(updated);
    } catch (error: unknown) {
      showToast(
        error instanceof Error ? error.message : "Something went wrong"
      );
    }
  };

  return { toggleLike, likedSongs, likesCount };
}
