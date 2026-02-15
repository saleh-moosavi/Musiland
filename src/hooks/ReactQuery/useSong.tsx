import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createSong,
  deleteSong,
  editSong,
  getAllSongs,
  getSong,
  ISongResponse,
  ISongsResponse,
} from "@/services/song";
import { SongFormData } from "@/app/admin/_components/SongForm";

export const songKeys = {
  all: ["songs"] as const,
  detail: (id: string) => ["song", id] as const,
};

export function useGetAllSongs() {
  return useQuery<ISongsResponse>({
    queryKey: songKeys.all,
    queryFn: () => getAllSongs(),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

export function useGetSong(id: string) {
  return useQuery<ISongResponse>({
    queryKey: songKeys.detail(id),
    queryFn: () => getSong(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
  });
}

export function useCreateSong() {
  const queryClient = useQueryClient();
  return useMutation<ISongResponse, Error, SongFormData>({
    mutationFn: (data) => createSong(data),
    onSuccess: (newSong) => {
      if (newSong.success) {
        queryClient.invalidateQueries({
          queryKey: songKeys.all,
        });
        if (newSong.data) {
          queryClient.setQueryData(songKeys.detail(newSong.data.id), newSong);
        }
      }
    },
  });
}

export function useEditSong() {
  const queryClient = useQueryClient();
  return useMutation<ISongResponse, Error, { id: string; data: SongFormData }>({
    mutationFn: ({ id, data }) => editSong(id, data),
    onSuccess: (updatedSong, variables) => {
      if (updatedSong.success) {
        queryClient.invalidateQueries({
          queryKey: songKeys.detail(variables.id),
        });
        queryClient.invalidateQueries({
          queryKey: songKeys.all,
        });
        if (updatedSong.data) {
          queryClient.setQueryData(songKeys.detail(variables.id), updatedSong);
        }
      }
    },
  });
}

export function useDeleteSong() {
  const queryClient = useQueryClient();
  return useMutation<ISongResponse, Error, string>({
    mutationFn: (id) => deleteSong(id),
    onSuccess: (deletedSong) => {
      if (deletedSong.success) {
        queryClient.invalidateQueries({
          queryKey: songKeys.all,
        });
        if (deletedSong.data) {
          queryClient.removeQueries({
            queryKey: songKeys.detail(deletedSong.data.id),
          });
        }
      }
    },
  });
}
