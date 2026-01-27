import Link from "next/link";
import { useState } from "react";
import { IGenre } from "@/services/genre";
import { ChevronDown } from "lucide-react";
import useUserStore from "@/store/userStore";
import { IPlaylist } from "@/services/playlist";
import useWindowStore from "@/store/windowStore";
import MobileMenuWrapper from "./MobileMenuWrapper";

const menuItems = (playlists: IPlaylist[], genres: IGenre[]) => {
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

export default function NavListMobile({
  genres,
  playlists,
}: {
  genres: IGenre[];
  playlists: IPlaylist[];
}) {
  const { isLoggedIn } = useUserStore();
  const [subNavType, setSubNavType] = useState("");
  const [showSubNav, setShowSubNav] = useState(false);
  const { setShowMobileMenuPanel } = useWindowStore();

  const changeSubNav = (type: string) => {
    if (type === subNavType) {
      setSubNavType("");
      setShowSubNav(false);
      return;
    }
    setSubNavType(type);
    setShowSubNav(true);
  };

  return (
    <MobileMenuWrapper>
      <ul className="p-5 pt-10 space-y-2">
        {menuItems(playlists, genres).map((item, index) => (
          <li className="cursor-pointer" key={index}>
            {item.content ? (
              <p
                className={`flex justify-between items-center font-semibold p-2 w-full shadow-sm space-y-2 rounded-xl hover:shadow-md dark:shadow-my-white-high transition-all duration-300`}
                onClick={() => changeSubNav(item.title)}
              >
                {item.title}
                <ChevronDown className="size-5" />
              </p>
            ) : (
              <Link
                href={item.link}
                className="font-semibold block p-2 w-full shadow-sm space-y-2 rounded-xl hover:shadow-md dark:shadow-my-white-high transition-all duration-300"
                onClick={() => setShowMobileMenuPanel(false)}
              >
                {item.title}
              </Link>
            )}
            {item.content && item.title === subNavType && showSubNav && (
              <div className="font-semibold p-2 bg-my-white-low dark:bg-my-black-high mt-2 w-full space-y-2 rounded-xl">
                {item.content.map((data: IGenre | IPlaylist) => (
                  <Link
                    key={data._id}
                    onClick={() => setShowMobileMenuPanel(false)}
                    href={`/category/${data.name}?${item.type}=${data.name}`}
                  >
                    <p>{data.name}</p>
                  </Link>
                ))}
              </div>
            )}
          </li>
        ))}
        <li className="cursor-pointer">
          <Link
            href={isLoggedIn ? "/profile" : "/register"}
            onClick={() => setShowMobileMenuPanel(false)}
            className="font-semibold block p-2 w-full shadow-sm space-y-2 rounded-xl hover:shadow-md dark:shadow-my-white-high transition-all duration-300"
          >
            {isLoggedIn ? "Profile" : "Register"}
          </Link>
        </li>
      </ul>
    </MobileMenuWrapper>
  );
}
