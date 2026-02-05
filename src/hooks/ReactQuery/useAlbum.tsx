import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllAlbums,
  getAlbum,
  createAlbum,
  editAlbum,
  deleteAlbum,
  IAlbumResponse,
  IGetAllAlbumResponse,
} from "@/services/album";

// Query keys as constants
export const albumKeys = {
  all: ["albums"] as const,
  detail: (id: string) => ["album", id] as const,
};

// Get All Albums Hook
export function useGetAllAlbums() {
  return useQuery<IGetAllAlbumResponse>({
    queryKey: albumKeys.all,
    queryFn: getAllAlbums,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

// Get single Album by ID hook
export function useGetAlbum(id: string) {
  return useQuery<IAlbumResponse>({
    queryKey: albumKeys.detail(id),
    queryFn: () => getAlbum(id),
    enabled: !!id, // Only run if ID exists
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

// Create album mutation hook
export function useCreateAlbum() {
  const queryClient = useQueryClient();

  return useMutation<IAlbumResponse, Error, string>({
    mutationFn: (name: string) => createAlbum(name),
    onSuccess: (newAlbum) => {
      queryClient.invalidateQueries({ queryKey: albumKeys.all });

      // Optionally update cache immediately for better UX
      if (newAlbum.data) {
        queryClient.setQueryData(albumKeys.detail(newAlbum.data.id), newAlbum);
      }
    },
  });
}

// Edit album mutation hook
export function useEditAlbum() {
  const queryClient = useQueryClient();

  return useMutation<IAlbumResponse, Error, { id: string; name: string }>({
    mutationFn: ({ id, name }) => editAlbum(name, id),
    onSuccess: (updatedAlbum, variables) => {
      // Invalidate the specific album detail
      queryClient.invalidateQueries({
        queryKey: albumKeys.detail(variables.id),
      });

      // Invalidate the albums list
      queryClient.invalidateQueries({
        queryKey: albumKeys.all,
      });

      // Update cache immediately
      if (updatedAlbum.data) {
        queryClient.setQueryData(albumKeys.detail(variables.id), updatedAlbum);
      }
    },
  });
}

// Delete album mutation hook
export function useDeleteAlbum() {
  const queryClient = useQueryClient();

  return useMutation<IAlbumResponse, Error, string>({
    mutationFn: (id: string) => deleteAlbum(id),
    onSuccess: (_, id) => {
      // Remove the deleted album from cache
      queryClient.removeQueries({
        queryKey: albumKeys.detail(id),
      });

      // Invalidate the albums list
      queryClient.invalidateQueries({
        queryKey: albumKeys.all,
      });
    },
  });
}
