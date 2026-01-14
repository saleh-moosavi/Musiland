import useToast from "./useToast";
import { toogleLike } from "@/services/like";
import useUserStore from "@/store/userStore";
import useMusicStore from "@/store/musicStore";

export default function useToggleLike() {
  const { showToast } = useToast();
  const { setLikesCount, likesCount } = useMusicStore();
  const { likedSongs, setLikedSongs, userData } = useUserStore();

  const toggleLike = async (songId: string) => {
    if (!userData?.id) return showToast("Please Login First");

    try {
      const res = await toogleLike(userData?.id, songId);
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
