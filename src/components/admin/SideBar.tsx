"use client";

import Link from "next/link";
import { useState } from "react";
import useTheme from "@/hooks/useTheme";
import { links } from "@/constants/sidebarMenu";
import { ChevronsLeft, ChevronsRight, Moon, Sun } from "lucide-react";

export default function SideBar() {
  const { theme, handleTheme } = useTheme();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <menu
      className={`transition-all duration-300 h-full bg-my-white-low dark:bg-my-black-max dark:text-my-white-low rounded-xl p-5 flex flex-col justify-between overflow-hidden shadow-md shadow-my-black-low/50 ${
        isOpen ? "w-52" : "w-20"
      }`}
    >
      <ul className="felx items-center gap-20 *:cursor-pointer">
        <li
          className={`flex hover:bg-my-black-low/30 transition-all duration-300 rounded-xl p-2 items-center ${
            isOpen ? "justify-start" : " justify-center"
          }`}
        >
          <Link
            href={`/`}
            target="_blank"
            className="p-2 rounded flex justify-center items-center gap-5"
          >
            <img
              src={theme == "dark" ? "/Logo-dark.png" : "/Logo-light.png"}
              alt="Site Logo"
              className="min-w-5 w-5"
            />
            <p className={isOpen ? "" : "hidden"}>Musiland</p>
          </Link>
        </li>
        <hr />
        {links.map((link) => (
          <li
            key={link.path}
            className={`flex hover:bg-my-black-low/30 transition-all duration-300 rounded-xl p-2 items-center ${
              isOpen ? "justify-start" : " justify-center"
            }`}
          >
            <Link
              href={`/admin/dashboard/${link.path}`}
              className="p-2 rounded flex justify-center items-center gap-5"
            >
              <p className="*:size-5">{link.icon}</p>
              <p className={isOpen ? "" : "hidden"}>{link.name}</p>
            </Link>
          </li>
        ))}
      </ul>
      <article
        className={`flex justify-between items-center ${
          isOpen ? "p-2 " : "flex-col gap-5"
        }`}
      >
        <button className="cursor-pointer *:size-5" onClick={handleTheme}>
          {theme == "light" ? <Sun /> : <Moon />}
        </button>
        <button
          className="cursor-pointer animate-pulse"
          onClick={() => setIsOpen((prevValue) => !prevValue)}
        >
          {isOpen ? <ChevronsLeft /> : <ChevronsRight />}
        </button>
      </article>
    </menu>
  );
}
