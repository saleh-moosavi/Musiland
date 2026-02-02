import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createPlaylist,
  deletePlaylist,
  editPlaylist,
  getAllPlaylists,
  getPlaylist,
  IGetAllPlaylistResponse,
  IPlaylistResponse,
} from "@/services/playlist";

// Query keys as constants
export const playlistKeys = {
  all: ["playlists"] as const,
  detail: (id: string) => ["playlist", id] as const,
};

// Get All Playlists
export function useGetAllPlaylist() {
  return useQuery<IGetAllPlaylistResponse>({
    queryKey: playlistKeys.all,
    queryFn: getAllPlaylists,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

// Get single Playlist by ID hook
export function useGetOnePlaylist(id: string) {
  return useQuery<IPlaylistResponse>({
    queryKey: playlistKeys.detail(id),
    queryFn: () => getPlaylist(id),
    enabled: !!id, // Only run if ID exists
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

// Create Playlist mutation hook
export function useCreatePlaylist() {
  const queryClient = useQueryClient();

  return useMutation<IPlaylistResponse, Error, string>({
    mutationFn: (name: string) => createPlaylist(name),
    onSuccess: (newPlaylist) => {
      queryClient.invalidateQueries({ queryKey: playlistKeys.all });

      // Optionally update cache immediately for better UX
      if (newPlaylist.data) {
        queryClient.setQueryData(
          playlistKeys.detail(newPlaylist.data.id),
          newPlaylist,
        );
      }
    },
  });
}

// Edit Playlist mutation hook
export function useEditPlaylist() {
  const queryClient = useQueryClient();

  return useMutation<IPlaylistResponse, Error, { id: string; name: string }>({
    mutationFn: ({ id, name }) => editPlaylist(name, id),
    onSuccess: (updatedPlaylist, variables) => {
      // Invalidate the specific Playlist detail
      queryClient.invalidateQueries({
        queryKey: playlistKeys.detail(variables.id),
      });

      // Invalidate the Playlists list
      queryClient.invalidateQueries({
        queryKey: playlistKeys.all,
      });

      // Update cache immediately
      if (updatedPlaylist.data) {
        queryClient.setQueryData(
          playlistKeys.detail(variables.id),
          updatedPlaylist,
        );
      }
    },
  });
}

// Delete playlist mutation hook
export function useDeletePlaylist() {
  const queryClient = useQueryClient();

  return useMutation<IPlaylistResponse, Error, string>({
    mutationFn: (id: string) => deletePlaylist(id),
    onSuccess: (_, id) => {
      // Remove the deleted Playlist from cache
      queryClient.removeQueries({
        queryKey: playlistKeys.detail(id),
      });

      // Invalidate the Playlists list
      queryClient.invalidateQueries({
        queryKey: playlistKeys.all,
      });
    },
  });
}
