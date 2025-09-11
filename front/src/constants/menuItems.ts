import { generalItems } from "@/types/generalItems";

export const menuItems = (
  playlists: generalItems[],
  genres: generalItems[]
) => {
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
    { title: "Register", content: null, show: true, link: "/register" },
  ];
};
