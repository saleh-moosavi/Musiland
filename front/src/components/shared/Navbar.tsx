"use client";
import Link from "next/link";
import { useState } from "react";
import useTheme from "@/hooks/useTheme";
import NavListMobile from "./NavListMobile";
import useUserStore from "@/store/userStore";
import NavListDesktop from "./NavListDesktop";
import useWindowStore from "@/store/windowStore";
import useNavbarData from "@/hooks/useNavbarData";
import { LogIn, Menu, Moon, Sun, User } from "lucide-react";

export default function Navbar() {
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const { isLoggedIn } = useUserStore();
  const { theme, handleTheme } = useTheme();
  const { genres, playlists } = useNavbarData();
  const {
    navbarData,
    showSubNav,
    navbarType,
    showMobileMenuPanel,
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

  const handleNavbarData = (type: "genre" | "playlist", data: any) => {
    setNavbarData(data);
    setNavbarType(type);
  };

  return (
    <header className="pt-2 fixed top-0 inset-x-0 z-50 max-w-[90rem] mx-5 xl:mx-auto">
      <section className="flex justify-between w-full gap-x-20 shadow-lg p-5 bg-slate-100 dark:bg-gray-800 dark:text-white sticky inset-0 rounded-2xl">
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
              <div className="w-18 lg:w-20 h-18 lg:h-20 flex place-content-center p-2 absolute inset-0 -top-5 -translate-x-1/2 bg-slate-100 dark:bg-gray-800 rounded-full shadow-lg">
                <img
                  src={theme == "light" ? "/Logo-light.png" : "/Logo-dark.png"}
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
            <li onMouseEnter={() => handleNavbarData("playlist", playlists)}>
              Playlists
            </li>
            <li onMouseEnter={() => handleNavbarData("genre", genres)}>
              Genres
            </li>
          </ul>
        </div>
        <button className="cursor-pointer">
          {isLoggedIn ? (
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

      <NavListMobile
        genres={genres}
        playlists={playlists}
        showMobileMenuPanel={showMobileMenuPanel}
        setShowMobileMenuPanel={setShowMobileMenuPanel}
      />
    </header>
  );
}
