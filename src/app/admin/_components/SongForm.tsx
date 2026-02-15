"use client";

import z from "zod";
import useToast from "@/hooks/useToast";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import FormButton from "@/components/FormButton";
import CustomInput from "@/components/CustomInput";
import CustomOption from "@/components/CustomOption";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import {
  Music,
  FileText,
  Image as ImageIcon,
  Mic,
  Disc,
  List,
} from "lucide-react";
import { IMode, ISongResponse } from "@/services/song";
import { useGetAllGenres } from "@/hooks/ReactQuery/useGenre";
import { useGetAllAlbums } from "@/hooks/ReactQuery/useAlbum";
import { useGetAllSingers } from "@/hooks/ReactQuery/useSinger";
import { useGetAllPlaylist } from "@/hooks/ReactQuery/usePlaylist";
import {
  useCreateSong,
  useEditSong,
  useGetSong,
} from "@/hooks/ReactQuery/useSong";

/***************** Zod Schema *****************/
export const addSongSchema = z.object({
  name: z.string().min(1, "Song name is required"),
  lyric: z.string().optional(),
  audioUrl: z.string().url("Url Must Fill Currectly"),
  coverUrl: z.string().url("Url Must Fill Currectly"),
  singer: z.string().min(1, "Select Singer"),
  album: z.string().min(1, "Select Album"),
  genre: z.array(z.string()).min(1, "Select Genre"),
  playlist: z.array(z.string()).min(1, "Select Playlist"),
});

export type SongFormData = z.infer<typeof addSongSchema>;

export default function SongForm({ mode }: { mode: IMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const songId = searchParams.get("itemId");
  const { showToast } = useToast();
  const [submitError, setSubmitError] = useState<string | null>(null);
  const createMutation = useCreateSong();
  const editMutation = useEditSong();

  const {
    formState: { errors, isLoading },
    register,
    handleSubmit,
    reset,
  } = useForm<SongFormData>({
    resolver: zodResolver(addSongSchema),
    defaultValues: {
      name: "",
      lyric: "",
      audioUrl: "",
      coverUrl: "",
      singer: "",
      album: "",
      genre: [],
      playlist: [],
    },
  });

  const { data: singers } = useGetAllSingers();
  const { data: albums } = useGetAllAlbums();
  const { data: genres } = useGetAllGenres();
  const { data: playlists } = useGetAllPlaylist();
  const {
    data: songData,
    isLoading: isSongLoading,
    error: songError,
  } = useGetSong(songId as string);

  useEffect(() => {
    if (songId && songData?.data) {
      reset({
        name: songData.data.name || "",
        lyric: songData.data.lyric || "",
        album: songData.data.album?.id || "",
        singer: songData.data.singer?.id || "",
        audioUrl: songData.data.audio_url || "",
        coverUrl: songData.data.cover_url || "",
        genre: songData.data.songs_genres?.map((g) => g.genre.id) || [],
        playlist:
          songData.data.songs_playlists?.map((p) => p.playlist.id) || [],
      });
    }
  }, [songId, songData, reset]);

  if (songId && isSongLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading song data...</div>
      </div>
    );
  }
  if (songId && songError) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-500">Error: {songError.message}</div>
      </div>
    );
  }

  const submitHandler = async (data: SongFormData) => {
    setSubmitError(null);
    let result: ISongResponse;
    try {
      if (mode === "add") {
        result = await createMutation.mutateAsync(data);
      } else {
        if (!songId) {
          setSubmitError("Song ID is required for editing");
          return;
        }
        result = await editMutation.mutateAsync({ id: songId, data });
      }

      if (result.success) {
        showToast(
          `Song ${mode === "add" ? "added" : "updated"} successfully!`,
          mode === "add" ? "green" : "orange",
        );

        reset();
        router.push("/admin/dashboard/song");
        router.refresh();
      } else {
        setSubmitError(result.message || "Operation failed.");
      }
    } catch (error: unknown) {
      setSubmitError(
        error instanceof Error
          ? error?.message
          : "Server connection error. Please try again.",
      );
    }
  };

  return (
    <article className="mx-auto p-6 rounded-3xl bg-my-white-low dark:bg-my-black-max mt-8 shadow-md dark:shadow-my-black-low/30 text-my-black-max dark:text-my-white-low">
      <h3 className="text-center text-xl font-bold mb-6">
        {mode === "add" ? "Add New Song" : "Edit Song"}
      </h3>

      <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
        {/* Basic Info Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <CustomInput
            register={register("name")}
            icon={<Music className="w-5 h-5" />}
            name="Song Name"
            error={errors.name?.message}
          />

          <CustomInput
            register={register("lyric")}
            icon={<FileText className="w-5 h-5" />}
            name="Lyrics"
            error={errors.lyric?.message}
          />

          <CustomInput
            register={register("audioUrl")}
            icon={<Music className="w-5 h-5" />}
            name="Audio URL"
            error={errors.audioUrl?.message}
          />

          <CustomInput
            register={register("coverUrl")}
            icon={<ImageIcon className="w-5 h-5" />}
            name="Cover Image URL"
            error={errors.coverUrl?.message}
          />
        </div>

        {/* Selection Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <CustomOption
            title="Singer"
            icon={<Mic className="w-5 h-5" />}
            register={register("singer")}
            data={singers?.data || []}
            error={errors.singer?.message}
          />

          <CustomOption
            title="Album"
            icon={<Disc className="w-5 h-5" />}
            register={register("album")}
            data={albums?.data || []}
            error={errors.album?.message}
          />

          <CustomOption
            multiple
            title="Genres"
            icon={<List className="w-5 h-5" />}
            register={register("genre")}
            data={genres?.data || []}
            error={errors.genre?.message}
          />

          <CustomOption
            multiple
            title="Playlists"
            icon={<List className="w-5 h-5" />}
            register={register("playlist")}
            data={playlists?.data || []}
            error={errors.playlist?.message}
          />
        </div>

        {/* Submit Section */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex flex-row gap-3 justify-center items-center">
            <FormButton type="submit" isLoading={isLoading}>
              {mode == "add" ? "Add" : "Edit"} New Song
            </FormButton>

            <button
              type="button"
              onClick={() => router.back()}
              disabled={isLoading}
              className="cursor-pointer px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-300 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 disabled:opacity-50 transition-colors w-full"
            >
              Cancel
            </button>
          </div>

          {submitError && (
            <div className="mt-3 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
              <p className="text-red-600 dark:text-red-400 text-sm text-center">
                {submitError}
              </p>
            </div>
          )}
        </div>
      </form>
    </article>
  );
}
