"use client";

import useTheme from "@/hooks/useTheme";
import { Moon, Sun } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
const links = [
  { name: "Song", path: "song" },
  { name: "Singer", path: "singer" },
  { name: "Genre", path: "genre" },
  { name: "Playlist", path: "playlist" },
  { name: "Album", path: "album" },
  { name: "User", path: "user" },
];

export default function SideBar() {
  const { theme, handleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  if (isOpen) {
    return (
      <menu
        className={`transition-all duration-300 h-full bg-amber-300 rounded-xl p-2 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center gap-20">
          <h3>Menu</h3>
          <button className="cursor-pointer" onClick={() => setIsOpen(false)}>
            close
          </button>
        </div>
        <hr />
        <ul className="felx items-center gap-20">
          {links.map((link) => (
            <li key={link.path}>
              <Link
                href={`/dashboard/${link.path}`}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
              >
                {link.name}
              </Link>
            </li>
          ))}
        </ul>
        <button className="cursor-pointer" onClick={handleTheme}>
          {theme == "light" ? <Sun /> : <Moon />}
        </button>
      </menu>
    );
  }
  return (
    <p
      className="h-full bg-yellow-500 cursor-pointer rounded-xl p-2"
      onClick={() => setIsOpen(true)}
    >
      open
    </p>
  );
}
