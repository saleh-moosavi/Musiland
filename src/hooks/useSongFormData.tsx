import { getSong } from "@/services/song";
import { useState, useEffect } from "react";
import { getAlbums } from "@/services/album";
import { getSingers } from "@/services/singer";
import { getAllGenres } from "@/services/genre";
import { GenericFormData } from "@/types/inputTypes";
import { getAllPlaylists } from "@/services/playlist";
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
        const fetchesList = [
          getSingers(),
          getAlbums(),
          getAllGenres(),
          getAllPlaylists(),
        ];
        if (mode === "edit" && songId) {
          fetchesList.push(getSong(songId));
        }

        const [singerRes, albumRes, genreRes, playlistRes, songRes] =
          await Promise.all(fetchesList);

        setSingers(singerRes);
        setAlbums(albumRes.data);
        setGenres(genreRes.data);
        setPlaylists(playlistRes.data);

        if (mode === "edit" && songRes) {
          const songData = songRes;
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
