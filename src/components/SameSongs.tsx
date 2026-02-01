"use client";
import { useEffect } from "react";
import { ISong } from "@/services/song";
import { SongQueries } from "@/constants";
import { getAllSongs } from "@/services/song";
import useMusicStore from "@/store/musicStore";
import SameSongWrapper from "./SameSongsWrapper";
import SameSongsContent from "./SameSongsContent";
import useSameSongsStore from "@/store/sameSongStore";

export default function SameSongs() {
  const { sameSongsList, setSameSongsList } = useSameSongsStore();
  const { audioSrc, audioGenres, audioPlaylists } = useMusicStore();

  useEffect(() => {
    const fetchSongs = async () => {
      const res = await getAllSongs(
        SongQueries.related.query(audioGenres, audioPlaylists)
      );
      const songs = res?.data;
      if (!songs || !res.success) {
        setSameSongsList([]);
      } else {
        setSameSongsList(songs || []);
      }
    };
    if (
      sameSongsList?.length < 1 ||
      sameSongsList[sameSongsList?.length - 1]?.audioUrl === audioSrc
    ) {
      fetchSongs();
    }
  }, [audioSrc]);

  return (
    <SameSongWrapper>
      {sameSongsList ? (
        sameSongsList.map((song: ISong) => (
          <SameSongsContent key={song.id} song={song} />
        ))
      ) : (
        <p>There Is No Song Here !!!</p>
      )}
    </SameSongWrapper>
  );
}
