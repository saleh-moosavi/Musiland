import { useState, useEffect } from "react";
import { GenericFormData } from "@/types/inputTypes";
import {
  SongFormData,
  UseSongFormDataResult,
  UseSongFormProps,
} from "@/types/song";

export function useSongFormData({
  mode,
  songId,
}: UseSongFormProps): UseSongFormDataResult {
  const [singers, setSingers] = useState<GenericFormData[]>([]);
  const [albums, setAlbums] = useState<GenericFormData[]>([]);
  const [genres, setGenres] = useState<GenericFormData[]>([]);
  const [playlists, setPlaylists] = useState<GenericFormData[]>([]);
  const [song, setSong] = useState<SongFormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetches = [
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/singers`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/albums`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/genres`),
          fetch(`${process.env.NEXT_PUBLIC_API_URL}/playlists`),
        ];
        if (mode === "edit" && songId) {
          fetches.push(
            fetch(`${process.env.NEXT_PUBLIC_API_URL}/songs/${songId}`)
          );
        }

        const [singerRes, albumRes, genreRes, playlistRes, songRes] =
          await Promise.all(fetches);

        setSingers(await singerRes.json());
        setAlbums(await albumRes.json());
        setGenres(await genreRes.json());
        setPlaylists(await playlistRes.json());

        if (mode === "edit" && songRes) {
          const songData = (await songRes.json()).song;
          setSong({
            name: songData.name || "",
            lyric: songData.lyric || "",
            audioUrl: songData.audioUrl || "",
            coverUrl: songData.coverUrl || "",
            singerId: songData.singer?._id || "",
            albumId: songData.album?._id || "",
            genreIds: songData.genres?.map((g: GenericFormData) => g._id) || [],
            playlistIds:
              songData.playlists?.map((p: GenericFormData) => p._id) || [],
          });
        }
      } catch (err) {
        setError("Failed to fetch data.");
      }
    };
    fetchData();
  }, [mode, songId]);

  return { singers, albums, genres, playlists, song, error };
}
