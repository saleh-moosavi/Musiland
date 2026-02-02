import { useQuery } from "@tanstack/react-query";
import { getAllPlaylists } from "@/services/playlist";

export function useGetAllPlaylist() {
  return useQuery({
    queryKey: ["PlaylistList"],
    queryFn: getAllPlaylists,
    retry: 2,
  });
}

export function useGetOnePlaylist() {
  return useQuery({
    queryKey: ["PlaylistList"],
    queryFn: getAllPlaylists,
    retry: 2,
  });
}
