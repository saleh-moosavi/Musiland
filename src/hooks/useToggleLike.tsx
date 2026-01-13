import useToast from "./useToast";
import useUserStore from "@/store/userStore";
import useMusicStore from "@/store/musicStore";
import { likeToggler } from "@/services/like";

export default function useToggleLike() {
  const { showToast } = useToast();
  const { setLikesCount, likesCount } = useMusicStore();
  const { likedSongs, setLikedSongs, userData } = useUserStore();

  const toggleLike = async (songId: string) => {
    if (!userData?.id) return showToast("Please Login First");

    try {
      const res = await likeToggler(userData?.id, songId);
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
