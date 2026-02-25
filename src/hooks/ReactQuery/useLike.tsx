import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  toggleSongLike,
  getUserLikedSongs,
  IToggleLikeResponse,
} from "@/services/like";
import { ISongsResponse } from "@/services/song";

// Query keys as constants
export const likeKeys = {
  likedSongs: (userId: string) => ["liked-songs", userId] as const,
  likeStatus: (songId: string, userId: string) =>
    ["like-status", songId, userId] as const,
  likesCount: (songId: string) => ["likes-count", songId] as const,
};

// Get user's liked songs hook
export function useGetUserLikedSongs(
  userId: string,
  page?: number,
  limit?: number,
) {
  return useQuery<ISongsResponse>({
    queryKey: [...likeKeys.likedSongs(userId), page, limit],
    queryFn: () => getUserLikedSongs(userId, page, limit),
    enabled: !!userId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

// Toggle like mutation hook
export function useToggleLike() {
  const queryClient = useQueryClient();

  return useMutation<
    IToggleLikeResponse,
    Error,
    { userId: string; songId: string }
  >({
    mutationFn: ({ userId, songId }) => toggleSongLike(userId, songId),
    onSuccess: (data, variables) => {
      const { userId, songId } = variables;

      // Invalidate and update queries

      // Update liked songs list
      queryClient.invalidateQueries({
        queryKey: likeKeys.likedSongs(userId),
      });

      // Update like status
      queryClient.invalidateQueries({
        queryKey: likeKeys.likeStatus(songId, userId),
      });

      // Update likes count
      queryClient.invalidateQueries({
        queryKey: likeKeys.likesCount(songId),
      });
    },
  });
}
