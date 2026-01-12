import {
  Album,
  AudioLines,
  ListMusic,
  MicVocal,
  HomeIcon,
  Music,
  User,
} from "lucide-react";

export const SideBarLinks = [
  { name: "Dashboard", path: "/", icon: <HomeIcon /> },
  { name: "Song", path: "song", icon: <Music /> },
  { name: "Singer", path: "singer", icon: <MicVocal /> },
  { name: "Genre", path: "genre", icon: <AudioLines /> },
  { name: "Playlist", path: "playlist", icon: <ListMusic /> },
  { name: "Album", path: "album", icon: <Album /> },
  { name: "User", path: "user", icon: <User /> },
];
