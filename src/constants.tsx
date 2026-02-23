import {
  Album,
  AudioLines,
  ListMusic,
  MicVocal,
  HomeIcon,
  Music,
  User,
} from "lucide-react";
import { IGenre } from "./services/genre";
import { IPlaylist } from "./services/playlist";

export const SideBarLinks = [
  { name: "Dashboard", path: "/", icon: <HomeIcon /> },
  { name: "Song", path: "song", icon: <Music /> },
  { name: "Singer", path: "singer", icon: <MicVocal /> },
  { name: "Genre", path: "genre", icon: <AudioLines /> },
  { name: "Playlist", path: "playlist", icon: <ListMusic /> },
  { name: "Album", path: "album", icon: <Album /> },
  { name: "User", path: "user", icon: <User /> },
];

export const SongQueries = {
  newest: { title: "Newest Songs", query: "sort=date,dec" },
  popular: { title: "Most Popular Songs", query: "sort=likes,dec" },
  oldets: { title: "Oldets Songs", query: "sort=date" },
  related: {
    title: "Related Songs",
    query: (
      genres: { genre: IGenre }[],
      playlists: { playlist: IPlaylist }[],
    ) =>
      `genre=${genres.map((g) => g.genre.id).join(",")}&playlist=${playlists
        .map((p) => p.playlist.id)
        .join(",")}`,
  },
};
