import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllGenres,
  getGenre,
  createGenre,
  editGenre,
  deleteGenre,
  IGenreResponse,
  IGetAllGenreResponse,
} from "@/services/genre";

// Query keys as constants
export const genreKeys = {
  all: ["genres"] as const,
  detail: (id: string) => ["genre", id] as const,
};

// Get All Genres Hook
export function useGetAllGenres() {
  return useQuery<IGetAllGenreResponse>({
    queryKey: genreKeys.all,
    queryFn: getAllGenres,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

// Get single Genre by ID hook
export function useGetGenre(id: string) {
  return useQuery<IGenreResponse>({
    queryKey: genreKeys.detail(id),
    queryFn: () => getGenre(id),
    enabled: !!id, // Only run if ID exists
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

// Create genre mutation hook
export function useCreateGenre() {
  const queryClient = useQueryClient();

  return useMutation<IGenreResponse, Error, string>({
    mutationFn: (name: string) => createGenre(name),
    onSuccess: (newGenre) => {
      queryClient.invalidateQueries({ queryKey: genreKeys.all });

      // Optionally update cache immediately for better UX
      if (newGenre.data) {
        queryClient.setQueryData(genreKeys.detail(newGenre.data.id), newGenre);
      }
    },
  });
}

// Edit genre mutation hook
export function useEditGenre() {
  const queryClient = useQueryClient();

  return useMutation<IGenreResponse, Error, { id: string; name: string }>({
    mutationFn: ({ id, name }) => editGenre(name, id),
    onSuccess: (updatedGenre, variables) => {
      // Invalidate the specific genre detail
      queryClient.invalidateQueries({
        queryKey: genreKeys.detail(variables.id),
      });

      // Invalidate the genres list
      queryClient.invalidateQueries({
        queryKey: genreKeys.all,
      });

      // Update cache immediately
      if (updatedGenre.data) {
        queryClient.setQueryData(genreKeys.detail(variables.id), updatedGenre);
      }
    },
  });
}

// Delete genre mutation hook
export function useDeleteGenre() {
  const queryClient = useQueryClient();

  return useMutation<IGenreResponse, Error, string>({
    mutationFn: (id: string) => deleteGenre(id),
    onSuccess: (_, id) => {
      // Remove the deleted genre from cache
      queryClient.removeQueries({
        queryKey: genreKeys.detail(id),
      });

      // Invalidate the genres list
      queryClient.invalidateQueries({
        queryKey: genreKeys.all,
      });
    },
  });
}
