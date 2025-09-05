import { useState, useEffect } from "react";
import { OptionData, SongFormData } from "@/types/song";

interface UseSongFormDataProps {
  mode: "add" | "edit";
  songId: string | null;
}

interface UseSongFormDataResult {
  singers: OptionData[];
  albums: OptionData[];
  genres: OptionData[];
  playlists: OptionData[];
  song: SongFormData | null;
  error: string | null;
}

export function useSongFormData({
  mode,
  songId,
}: UseSongFormDataProps): UseSongFormDataResult {
  const [singers, setSingers] = useState<OptionData[]>([]);
  const [albums, setAlbums] = useState<OptionData[]>([]);
  const [genres, setGenres] = useState<OptionData[]>([]);
  const [playlists, setPlaylists] = useState<OptionData[]>([]);
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
          const songData = await songRes.json();
          setSong({
            name: songData.name || "",
            lyric: songData.lyric || "",
            audioUrl: songData.audioUrl || "",
            coverUrl: songData.coverUrl || "",
            singerId: songData.singer?._id || "",
            albumId: songData.album?._id || "",
            genreIds: songData.genres?.map((g: any) => g._id) || [],
            playlistIds: songData.playlists?.map((p: any) => p._id) || [],
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
