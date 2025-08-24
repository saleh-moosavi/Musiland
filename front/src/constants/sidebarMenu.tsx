import {
  Album,
  AudioLines,
  ListMusic,
  MicVocal,
  Music,
  User,
} from "lucide-react";

export const links = [
  { name: "Song", path: "song", icon: <Music /> },
  { name: "Singer", path: "singer", icon: <MicVocal /> },
  { name: "Genre", path: "genre", icon: <AudioLines /> },
  { name: "Playlist", path: "playlist", icon: <ListMusic /> },
  { name: "Album", path: "album", icon: <Album /> },
  { name: "User", path: "user", icon: <User /> },
];
