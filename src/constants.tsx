import {
  Album,
  AudioLines,
  ListMusic,
  MicVocal,
  HomeIcon,
  Music,
  User,
} from "lucide-react";
import { IGenre } from "./models/genre";
import { IPlaylist } from "./models/playlist";

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
    query: (genres: IGenre[], playlists: IPlaylist[]) =>
      `genre=${genres.map((g: IGenre) => g.name).join(",")}&playlist=${playlists
        .map((p: IPlaylist) => p.name)
        .join(",")}`,
  },
};
