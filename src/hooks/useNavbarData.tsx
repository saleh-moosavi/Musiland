import { useEffect, useState } from "react";
import { getAllGenres } from "@/services/genre";
import { generalItems } from "@/types/generalItems";
import { getAllPlaylists } from "@/services/playlist";

export default function useNavbarData() {
  const [genres, setGenres] = useState<generalItems[]>([]);
  const [playlists, setPlaylists] = useState<generalItems[]>([]);

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
