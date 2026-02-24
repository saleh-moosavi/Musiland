import { getUserLikedSong } from "@/services/user";
import { useQuery } from "@tanstack/react-query";

// Query keys as constants
export const userKeys = {
  all: ["users"] as const,
  detail: (id: string) => ["user", id] as const,
};

// Get All Genres Hook
export function useGetUserLikedSongs(id: string) {
  return useQuery({
    queryKey: userKeys.detail(id),
    queryFn: () => getUserLikedSong(id),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}
