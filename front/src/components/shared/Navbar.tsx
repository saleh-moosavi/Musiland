"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogIn, Menu, Moon } from "lucide-react";
import NavListMobile from "./NavListMobile";
import NavListDesktop from "./NavListDesktop";
import useWindowStore from "@/store/windowStore";

export default function Navbar() {
  const [genres, setGenres] = useState<any>([]);
  const [playlists, setPlaylists] = useState<any>([]);
  const {
    navbarData,
    showSubNav,
    showMobileMenuPanel,
    setNavbarData,
    setShowSubNav,
    setShowMobileMenuPanel,
  } = useWindowStore();
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchData = async (
      url: string,
      setter: React.Dispatch<React.SetStateAction<any>>
    ) => {
      const response = await fetch(url);
      const data = await response.json();
      setter(data.data);
    };

    fetchData(
      `http://localhost:1337/api/genres?&populate=[genre][fields]=id,name`,
      setGenres
    );
    fetchData(
      `http://localhost:1337/api/playlists?&populate=[playlists][fields]=id,name`,
      setPlaylists
    );
  }, []);

  const handleMouseToggle = (show: boolean) => {
    if (timeoutId) clearTimeout(timeoutId);
    if (show) {
      setShowSubNav(true);
    } else {
      const id = setTimeout(() => setShowSubNav(false), 300);
      setTimeoutId(id);
    }
  };

  return (
    <header className="pt-2 fixed top-0 inset-x-0 z-50 max-w-[90rem] mx-5 xl:mx-auto">
      <section className="flex justify-between w-full gap-x-20 shadow-lg p-5 bg-slate-100 sticky inset-0 rounded-full">
        <button>
          <Moon />
        </button>
        <div className="flex items-center justify-center">
          <ul className="items-center gap-x-10 hidden lg:flex">
            <li>About</li>
            <li>Contact</li>
          </ul>
          <Link href="/">
            <div className="relative lg:mx-20">
              <div className="w-18 lg:w-20 h-18 lg:h-20 flex place-content-center p-2 absolute inset-0 -top-5 -translate-x-1/2 bg-slate-100 rounded-full shadow-lg">
                <img src="/next.svg" alt="Logo" />
              </div>
            </div>
          </Link>
          <ul
            className="items-center gap-x-10 hidden lg:flex *:cursor-pointer"
            onMouseEnter={() => handleMouseToggle(true)}
            onMouseLeave={() => handleMouseToggle(false)}
          >
            <li onMouseEnter={() => setNavbarData(playlists)}>Playlists</li>
            <li onMouseEnter={() => setNavbarData(genres)}>Genres</li>
          </ul>
        </div>
        <button className="cursor-pointer">
          <Link href="http://localhost:1337">
            <LogIn className="hidden lg:block" />
          </Link>
          <Menu
            className="lg:hidden"
            onClick={() => setShowMobileMenuPanel(true)}
          />
        </button>
        {showSubNav && (
          <NavListDesktop
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
