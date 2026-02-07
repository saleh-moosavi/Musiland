import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllSingers,
  getSinger,
  createSinger,
  editSinger,
  deleteSinger,
  ISingerResponse,
  IGetAllSingerResponse,
} from "@/services/singer";

// Query keys as constants
export const singerKeys = {
  all: ["singers"] as const,
  detail: (id: string) => ["singer", id] as const,
};

// Get All Singers Hook
export function useGetAllSingers() {
  return useQuery<IGetAllSingerResponse>({
    queryKey: singerKeys.all,
    queryFn: getAllSingers,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    retry: 2,
  });
}

// Get single Singer by ID hook
export function useGetSinger(id: string) {
  return useQuery<ISingerResponse>({
    queryKey: singerKeys.detail(id),
    queryFn: () => getSinger(id),
    enabled: !!id, // Only run if ID exists
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

// Create singer mutation hook
export function useCreateSinger() {
  const queryClient = useQueryClient();

  return useMutation<ISingerResponse, Error, string>({
    mutationFn: (name: string) => createSinger(name),
    onSuccess: (newSinger) => {
      queryClient.invalidateQueries({ queryKey: singerKeys.all });

      // Optionally update cache immediately for better UX
      if (newSinger.data) {
        queryClient.setQueryData(
          singerKeys.detail(newSinger.data.id),
          newSinger,
        );
      }
    },
  });
}

// Edit singer mutation hook
export function useEditSinger() {
  const queryClient = useQueryClient();

  return useMutation<ISingerResponse, Error, { id: string; name: string }>({
    mutationFn: ({ id, name }) => editSinger(name, id),
    onSuccess: (updatedSinger, variables) => {
      // Invalidate the specific singer detail
      queryClient.invalidateQueries({
        queryKey: singerKeys.detail(variables.id),
      });

      // Invalidate the singers list
      queryClient.invalidateQueries({
        queryKey: singerKeys.all,
      });

      // Update cache immediately
      if (updatedSinger.data) {
        queryClient.setQueryData(
          singerKeys.detail(variables.id),
          updatedSinger,
        );
      }
    },
  });
}

// Delete singer mutation hook
export function useDeleteSinger() {
  const queryClient = useQueryClient();

  return useMutation<ISingerResponse, Error, string>({
    mutationFn: (id: string) => deleteSinger(id),
    onSuccess: (_, id) => {
      // Remove the deleted singer from cache
      queryClient.removeQueries({
        queryKey: singerKeys.detail(id),
      });

      // Invalidate the singers list
      queryClient.invalidateQueries({
        queryKey: singerKeys.all,
      });
    },
  });
}
