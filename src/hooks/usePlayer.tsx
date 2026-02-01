import { ISong } from "@/services/song";
import useMusicStore from "@/store/musicStore";
import { useEffect, useRef, useState } from "react";
import useSameSongsStore from "@/store/sameSongStore";

export default function usePlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  const { sameSongsList } = useSameSongsStore();
  const {
    audioSrc,
    setAudioSrc,
    setAudioCover,
    setAudioName,
    setAudioGenres,
    setAudioPlaylists,
  } = useMusicStore();

  const songSetter = (song: ISong) => {
    setAudioSrc(song.audioUrl);
    setAudioCover(song.coverUrl);
    setAudioName(song.name);
    setAudioGenres(song.songs_genres);
    setAudioPlaylists(song.songs_playlists);
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      const currentIndex = sameSongsList.findIndex(
        (song) => song.audioUrl === audioSrc
      );

      if (currentIndex !== -1 && currentIndex < sameSongsList.length - 1) {
        const nextSong = sameSongsList[currentIndex + 1];
        songSetter(nextSong);
      }
    };

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("ended", handleEnded);
    };
  }, [sameSongsList]);

  useEffect(() => {
    if (audioSrc) {
      handlePlayPause();
    }
  }, [audioSrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      const updatePlayState = () => setIsPlaying(!audio.paused);
      audio.addEventListener("play", updatePlayState);
      audio.addEventListener("pause", updatePlayState);
      return () => {
        audio.removeEventListener("play", updatePlayState);
        audio.removeEventListener("pause", updatePlayState);
      };
    }
  }, [audioRef]);

  const previousSong = () => {
    const currentIndex = sameSongsList.findIndex(
      (song) => song.audioUrl === audioSrc
    );

    if (currentIndex > 0) {
      // Set the audioSrc to the previous song's audioUrl
      const song = sameSongsList[currentIndex - 1];
      songSetter(song);
    }
  };

  const nextSong = () => {
    const currentIndex = sameSongsList.findIndex(
      (song) => song.audioUrl === audioSrc
    );

    if (currentIndex !== -1 && currentIndex < sameSongsList.length - 1) {
      // Set the audioSrc to the next song's audioUrl
      const song = sameSongsList[currentIndex + 1];
      songSetter(song);
    }
  };

  const handlePlayPause = () => {
    if (!audioRef.current || !audioSrc) return;

    try {
      if (audioRef.current.paused) {
        audioRef.current.play().catch((err) => {
          console.warn("Play error:", err);
          setIsPlaying(false);
          return;
        });
        setIsPlaying(true);
      } else {
        audioRef.current.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.warn(error);
    }
  };

  return {
    audioRef,
    audioSrc,
    isPlaying,
    handlePlayPause,
    previousSong,
    nextSong,
  };
}
