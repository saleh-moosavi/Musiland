"use client";

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
  const [isOpen, setIsOpen] = useState(false); // وضعیت سایدبار

  if (isOpen) {
    return (
      <menu className="">
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
      </menu>
    );
  } else {
    return <p onClick={() => setIsOpen(true)}>open</p>;
  }
}
