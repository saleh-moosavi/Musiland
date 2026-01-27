import { useEffect, useState } from "react";
import { getAllGenres } from "@/services/genre";
import { getAllPlaylists } from "@/services/playlist";
import { IGenre } from "@/services/genre";
import { IPlaylist } from "@/services/playlist";

export default function useNavbarData() {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [playlists, setPlaylists] = useState<IPlaylist[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [genresRes, playlistsRes] = await Promise.all([
          getAllGenres(),
          getAllPlaylists(),
        ]);

        setGenres(genresRes?.data ?? []);
        setPlaylists(playlistsRes?.data ?? []);
      } catch (err) {
        console.error("Navbar data fetch error:", err);
      }
    };

    fetchData();
  }, []);

  return { genres, playlists };
}
