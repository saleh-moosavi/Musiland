"use client";
import Link from "next/link";
import Image from "next/image";
import { lazy, useState } from "react";
import useTheme from "@/hooks/useTheme";
import useUserStore from "@/store/userStore";
import useWindowStore from "@/store/windowStore";
import { LogIn, Menu, Moon, Sun, User } from "lucide-react";
import { IGenre } from "@/services/genre";
import { IPlaylist } from "@/services/playlist";
import { useGetAllGenres } from "@/hooks/ReactQuery/useGenre";
import { useGetAllPlaylist } from "@/hooks/ReactQuery/usePlaylist";
const NavListMobile = lazy(() => import("./NavListMobile"));
const NavListDesktop = lazy(() => import("./NavListDesktop"));

export default function Navbar() {
  const { userData } = useUserStore();
  const { theme, handleTheme } = useTheme();
  const { data: genres } = useGetAllGenres();
  const { data: playlists } = useGetAllPlaylist();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const {
    navbarData,
    showSubNav,
    navbarType,
    setNavbarData,
    setShowSubNav,
    setShowMobileMenuPanel,
    setNavbarType,
  } = useWindowStore();

  const handleMouseToggle = (show: boolean) => {
    if (timeoutId) clearTimeout(timeoutId);
    if (show) {
      setShowSubNav(true);
    } else {
      const id = setTimeout(() => setShowSubNav(false), 300);
      setTimeoutId(id);
    }
  };

  const handleNavbarData = (
    type: "genre" | "playlist",
    data: IGenre[] | IPlaylist[],
  ) => {
    setNavbarData(data);
    setNavbarType(type);
  };

  return (
    <header className="pt-2 fixed top-0 inset-x-0 z-[70] max-w-[90rem] mx-5 xl:mx-auto">
      <section className="flex justify-between w-full gap-x-20 shadow-md shadow-my-black-max/20 dark:shadow-my-white-high/30 p-5 bg-my-white-low dark:bg-my-black-max dark:text-my-white-low sticky inset-0 rounded-2xl">
        <button className="cursor-pointer" onClick={handleTheme}>
          {theme == "light" ? <Sun /> : <Moon />}
        </button>
        <div className="flex items-center justify-center">
          {/* left side of navbar */}
          <ul className="items-center gap-x-10 hidden lg:flex">
            <li>
              <Link href={"/about"}>About</Link>
            </li>
            <Link href={"/contact"}>Contact</Link>
          </ul>
          <Link href="/">
            <div className="relative lg:mx-20">
              <div className="w-18 lg:w-20 h-18 lg:h-20 flex place-content-center p-2 absolute inset-0 -top-5 -translate-x-1/2 bg-my-white-low dark:bg-my-black-max rounded-full shadow-md shadow-my-black-max/30 dark:shadow-my-white-high/30">
                <Image
                  src={theme == "light" ? "/Logo-light.png" : "/Logo-dark.png"}
                  width={500}
                  height={500}
                  className="scale-50"
                  alt="Logo"
                />
              </div>
            </div>
          </Link>
          {/* right side of navbar */}
          <ul
            className="items-center gap-x-10 hidden lg:flex *:cursor-pointer"
            onMouseEnter={() => handleMouseToggle(true)}
            onMouseLeave={() => handleMouseToggle(false)}
          >
            <li
              onMouseEnter={() =>
                playlists !== undefined && playlists.data
                  ? handleNavbarData("playlist", playlists.data)
                  : null
              }
            >
              Playlists
            </li>
            <li
              onMouseEnter={() =>
                genres !== undefined && genres?.data
                  ? handleNavbarData("genre", genres.data)
                  : null
              }
            >
              Genres
            </li>
          </ul>
        </div>
        <button className="cursor-pointer">
          {userData ? (
            <Link href="/profile">
              <User className="hidden lg:block" />
            </Link>
          ) : (
            <Link href="/register">
              <LogIn className="hidden lg:block" />
            </Link>
          )}
          <Menu
            className="lg:hidden"
            onClick={() => setShowMobileMenuPanel(true)}
          />
        </button>
        {showSubNav && (
          <NavListDesktop
            type={navbarType}
            navbarData={navbarData}
            onMouseEnter={() => handleMouseToggle(true)}
            onMouseLeave={() => handleMouseToggle(false)}
          />
        )}
      </section>

      {genres?.data && playlists?.data && (
        <NavListMobile genres={genres.data} playlists={playlists.data} />
      )}
    </header>
  );
}
