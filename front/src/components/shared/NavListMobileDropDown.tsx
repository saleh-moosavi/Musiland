import Link from "next/link";
import { useEffect, useState } from "react";
import useWindowStore from "@/store/windowStore";

export default function NavListMobileDropDown({ item }: any) {
  const [showSubNav, setShowSubNav] = useState(false);
  const { setShowMobileMenuPanel } = useWindowStore();

  useEffect(() => {
    setShowSubNav(item.show);
  }, []);

  return (
    <li>
      <p
        className="font-semibold p-2 w-full shadow space-y-2 rounded-xl hover:shadow-md dark:shadow-white transition-all duration-300"
        onClick={() => setShowSubNav(!showSubNav)}
      >
        {item.title}
      </p>
      {item.content && (
        <div
          className={
            showSubNav
              ? "font-semibold p-2 bg-gray-300 dark:bg-gray-700 mt-2 w-full shadow space-y-2 rounded-xl hover:shadow-md transition-all duration-300"
              : "hidden"
          }
        >
          {item.content.map((item: any) => (
            <Link
              onClick={() => setShowMobileMenuPanel(false)}
              key={item.id}
              href={`/category/${item.name}?filters[$or][0][genres][name][$in]=${item.name}&filters[$or][1][playlists][name][$in]=${item.name}`}
            >
              <p key={item.id}>{item.name}</p>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}
