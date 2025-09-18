import Link from "next/link";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import useWindowStore from "@/store/windowStore";
import { menuItems } from "@/constants/menuItems";
import MobileMenuWrapper from "./MobileMenuWrapper";
import { generalItems } from "@/types/generalItems";

export default function NavListMobile({
  genres,
  playlists,
}: {
  genres: generalItems[];
  playlists: generalItems[];
}) {
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
                {item.content.map((data: generalItems) => (
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
      </ul>
    </MobileMenuWrapper>
  );
}
