// components/SongForm.tsx
"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/auth/CustomInput";
import CustomOption from "@/components/auth/CustomOption";
import { useSongFormData } from "@/hooks/useSongFormData";
import { useSongFormSubmit } from "@/hooks/useSongFormSubmit";
import { addSongSchema, Mode, SongFormData } from "@/app/types/song";
import { Music, FileText, Image, Mic, Disc, List } from "lucide-react";

export default function SongForm({ mode }: { mode: Mode }) {
  const searchParams = useSearchParams();
  const songId = searchParams.get("songId");
  const {
    singers,
    albums,
    genres,
    playlists,
    song,
    error: fetchError,
  } = useSongFormData({ mode, songId });
  const {
    submit,
    error: submitError,
    isSubmitting,
  } = useSongFormSubmit({ mode, songId });

  const {
    formState: { errors },
    register,
    handleSubmit,
    setValue,
  } = useForm<SongFormData>({
    resolver: zodResolver(addSongSchema),
    defaultValues: {
      name: "",
      lyric: "",
      audioUrl: "",
      coverUrl: "",
      singerId: "",
      albumId: "",
      genreIds: [],
      playlistIds: [],
    },
  });

  // Populate form for edit mode
  useEffect(() => {
    if (mode === "edit" && song) {
      setValue("name", song.name);
      setValue("lyric", song.lyric);
      setValue("audioUrl", song.audioUrl);
      setValue("coverUrl", song.coverUrl);
      setValue("singerId", song.singerId);
      setValue("albumId", song.albumId);
      setValue("genreIds", song.genreIds);
      setValue("playlistIds", song.playlistIds);
    }
  }, [song, mode, setValue]);

  return (
    <article className="mx-auto p-5 rounded-3xl bg-slate-100 dark:bg-slate-800 mt-10 shadow dark:shadow-white/30 text-black dark:text-white space-y-5">
      <h3 className="text-center">{mode === "add" ? "Add" : "Edit"} Song</h3>
      <form
        onSubmit={handleSubmit(submit)}
        className="grid grid-cols-4 *:col-span-1 gap-6 w-full *:w-full"
      >
        <CustomInput
          register={register("name")}
          icon={<Music />}
          name="Song Name"
          error={errors.name?.message}
        />

        <CustomInput
          register={register("lyric")}
          icon={<FileText />}
          name="Lyric"
          error={errors.lyric?.message}
        />

        <CustomInput
          register={register("audioUrl")}
          icon={<Music />}
          name="Audio URL"
          error={errors.audioUrl?.message}
        />

        <CustomInput
          register={register("coverUrl")}
          icon={<Image />}
          name="Cover URL"
          error={errors.coverUrl?.message}
        />

        <CustomOption
          title="Singer"
          icon={<Mic />}
          register={register("singerId")}
          data={singers}
          error={errors.singerId?.message}
        />

        <CustomOption
          title="Album"
          icon={<Disc />}
          register={register("albumId")}
          data={albums}
          error={errors.albumId?.message}
        />

        <CustomOption
          multiple
          title="Genres"
          icon={<List />}
          register={register("genreIds")}
          data={genres}
          error={errors.genreIds?.message}
        />

        <CustomOption
          multiple
          title="Playlists"
          icon={<List />}
          register={register("playlistIds")}
          data={playlists}
          error={errors.playlistIds?.message}
        />

        {(fetchError || submitError) && (
          <p className="text-red-500 text-sm col-span-4">
            {fetchError || submitError}
          </p>
        )}

        <button
          disabled={isSubmitting}
          className="bg-gradient-to-r col-span-4 from-cyan-700 to-emerald-400 text-white px-4 py-2 w-full font-bold rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
        >
          {isSubmitting
            ? "Saving..."
            : mode === "add"
            ? "Add Song"
            : "Update Song"}
        </button>
      </form>
    </article>
  );
}
