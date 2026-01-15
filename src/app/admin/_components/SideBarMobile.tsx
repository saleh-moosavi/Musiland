"use client";

import Link from "next/link";
import Image from "next/image";
import useTheme from "@/hooks/useTheme";
import { SideBarLinks } from "@/constants";
import { Menu, Moon, Sun } from "lucide-react";
import useWindowStore from "@/store/windowStore";
import MobileMenuWrapper from "../../../components/shared/MobileMenuWrapper";

export default function SideBar() {
  const { theme, handleTheme } = useTheme();
  const { setShowMobileMenuPanel } = useWindowStore();

  return (
    <>
      <button
        className="fixed top-5 left-5 md:hidden p-2 dark:text-my-white-low text-my-black-max hover:scale-110 transition-all duration-200 cursor-pointer"
        onClick={() => setShowMobileMenuPanel(true)}
      >
        <Menu />
      </button>
      <MobileMenuWrapper>
        <menu
          className={`transition-all duration-300 h-full bg-my-white-low dark:bg-my-black-max dark:text-my-white-low rounded-xl p-5 flex flex-col justify-between`}
        >
          <ul className="felx items-center gap-20 *:cursor-pointer">
            <li className="flex justify-start hover:bg-my-black-low/30 transition-all duration-300 rounded-xl p-2 items-center shadow-md shadow-my-black-low/40 my-2">
              <Link
                href={`/`}
                target="_blank"
                className="p-2 rounded flex justify-center items-center gap-5"
              >
                <Image
                  src={theme == "dark" ? "/Logo-dark.png" : "/Logo-light.png"}
                  alt="Site Logo"
                  className="min-w-5 w-5"
                  width={100}
                  height={100}
                />
                <p>Musiland</p>
              </Link>
            </li>
            <hr />
            {SideBarLinks.map((link) => (
              <Link
                key={link.path}
                href={`/admin/dashboard/${link.path}`}
                onClick={() => setShowMobileMenuPanel(false)}
                className="flex justify-start hover:bg-my-black-low/30 transition-all duration-300 rounded-xl p-2 items-center shadow-md shadow-my-black-low/50 my-2"
              >
                <li className="p-2 rounded flex justify-center items-center gap-5">
                  <p className="*:size-5">{link.icon}</p>
                  <p>{link.name}</p>
                </li>
              </Link>
            ))}
            <li
              onClick={handleTheme}
              className="flex justify-start hover:bg-my-black-low/30 transition-all duration-300 rounded-xl p-2 items-center shadow-md shadow-my-black-low/50 my-2"
            >
              <div className="p-2 rounded flex justify-center items-center gap-5">
                <p className="*:size-5">
                  {theme == "light" ? <Sun /> : <Moon />}
                </p>
                <p>{theme == "light" ? "Light" : "Dark"}</p>
              </div>
            </li>
          </ul>
        </menu>
      </MobileMenuWrapper>
    </>
  );
}
