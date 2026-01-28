"use client";

import useToast from "@/hooks/useToast";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { getAllAlbums } from "@/services/album";
import { getAllGenres } from "@/services/genre";
import FormButton from "@/components/FormButton";
import { getAllSingers } from "@/services/singer";
import CustomInput from "@/components/CustomInput";
import CustomOption from "@/components/CustomOption";
import { getAllPlaylists } from "@/services/playlist";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { createSong, editSong, getSong } from "@/services/song";
import {
  Music,
  FileText,
  Image as ImageIcon,
  Mic,
  Disc,
  List,
} from "lucide-react";
import {
  addSongSchema,
  IMode,
  ISong,
  ISongResponse,
  SongFormData
} from "@/services/song";
import { IAlbum, IGetAllAlbumResponse } from "@/models/album";
import { IGenre, IGetAllGenreResponse } from "@/services/genre";
import { IGetAllSingerResponse, ISinger } from "@/services/singer";
import { IGetAllPlaylistResponse, IPlaylist } from "@/services/playlist";

export default function SongForm({ mode }: { mode: IMode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const songId = searchParams.get("itemId");
  const { showToast } = useToast();

  // State برای داده‌های فرم
  const [singers, setSingers] = useState<ISinger[]>([]);
  const [albums, setAlbums] = useState<IAlbum[]>([]);
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);
  const [songData, setSongData] = useState<ISong | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // فرم
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

  // Fetch داده‌های مورد نیاز
  useEffect(() => {
    const fetchData = async () => {
      try {
        setSubmitError(null);

        // Array of promises برای parallel fetching
        const fetchPromises: (
          | Promise<IGetAllSingerResponse>
          | Promise<IGetAllAlbumResponse>
          | Promise<IGetAllGenreResponse>
          | Promise<IGetAllPlaylistResponse>
          | Promise<ISongResponse>
        )[] = [
          getAllSingers(),
          getAllAlbums(),
          getAllGenres(),
          getAllPlaylists(),
        ];

        // اگر در حالت edit هستیم، song data رو هم fetch کنیم
        if (mode === "edit" && songId) {
          fetchPromises.push(getSong(songId));
        }

        // اجرای همه promises به صورت موازی
        const [singersRes, albumsRes, genresRes, playlistsRes, songRes] =
          await Promise.all(fetchPromises);

        // تنظیم state‌ها
        setAlbums(albumsRes.data as IAlbum[]);
        setSingers(singersRes?.data as ISinger[]);
        setGenres(genresRes.data as IGenre[]);
        setPlaylists(playlistsRes.data as IPlaylist[]);

        if (mode === "edit" && songRes && songRes.success) {
          const sData = songRes.data as ISong;
          setSongData(sData);

          reset({
            name: sData.name,
            lyric: sData.lyric,
            album: sData.album._id,
            singer: sData.singer._id,
            genre: sData.genre.map((g) => g._id),
            audioUrl: sData.audioUrl,
            coverUrl: sData.coverUrl,
            playlist: sData.playlist.map((p) => p._id),
          });
        }
      } catch (error: unknown) {
        setSubmitError(
          error instanceof Error
            ? error?.message
            : "Failed to fetch required data. Please try again."
        );
      }
    };

    fetchData();
  }, []);

  // Submit handler
  const submitHandler = async (data: SongFormData) => {
    setSubmitError(null);

    try {
      let result: ISongResponse;

      if (mode === "add") {
        // Create new song
        result = await createSong(data);
      } else {
        // Edit existing song
        if (!songId) {
          setSubmitError("Song ID is required for editing");
          return;
        }
        result = await editSong(songId, data);
      }

      // بررسی موفقیت‌آمیز بودن عملیات
      if (result.success) {
        showToast(
          `Song ${mode === "add" ? "added" : "updated"} successfully!`,
          mode === "add" ? "green" : "orange"
        );

        // Reset فرم
        reset();

        // Redirect به صفحه songs
        router.push("/admin/dashboard/song");
        router.refresh(); // برای update لیست songs
      } else {
        setSubmitError(result.message || "Operation failed.");
      }
    } catch (error: unknown) {
      setSubmitError(
        error instanceof Error
          ? error?.message
          : "Server connection error. Please try again."
      );
    }
  };

  // Loading state
  if (mode === "edit" && songData === null) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-gray-500">Loading song data...</div>
      </div>
    );
  }

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
            data={singers}
            error={errors.singer?.message}
          />

          <CustomOption
            title="Album"
            icon={<Disc className="w-5 h-5" />}
            register={register("album")}
            data={albums}
            error={errors.album?.message}
          />

          <CustomOption
            multiple
            title="Genres"
            icon={<List className="w-5 h-5" />}
            register={register("genre")}
            data={genres}
            error={errors.genre?.message}
          />

          <CustomOption
            multiple
            title="Playlists"
            icon={<List className="w-5 h-5" />}
            register={register("playlist")}
            data={playlists}
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
