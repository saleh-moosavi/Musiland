import { IGenre } from "@/models/genre";
import { IPlaylist } from "@/models/playlist";

export const menuItems = (playlists: IPlaylist[], genres: IGenre[]) => {
  return [
    {
      title: "Playlists",
      type: "playlist",
      show: false,
      content: playlists,
    },
    {
      title: "Genres",
      type: "genre",
      show: false,
      content: genres,
    },
    { title: "About Us", content: null, show: true, link: "/about" },
    { title: "Contact US", content: null, show: true, link: "/contact" },
  ];
};
