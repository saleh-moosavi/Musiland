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
      {item.content ? (
        <p
          className="font-semibold p-2 w-full shadow space-y-2 rounded-xl hover:shadow-md dark:shadow-white transition-all duration-300"
          onClick={() => setShowSubNav(!showSubNav)}
        >
          {item.title}
        </p>
      ) : (
        <Link onClick={() => setShowMobileMenuPanel(false)} href={item.link}>
          {item.title}
        </Link>
      )}
      {item.content && (
        <div
          className={
            showSubNav
              ? "font-semibold p-2 bg-gray-300 dark:bg-gray-700 mt-2 w-full shadow space-y-2 rounded-xl hover:shadow-md transition-all duration-300"
              : "hidden"
          }
        >
          {item.content.map((data: any) => (
            <Link
              onClick={() => setShowMobileMenuPanel(false)}
              key={data._id}
              href={`/category/${data.name}?${item.type}=${data.name}`}
            >
              <p>{data.name}</p>
            </Link>
          ))}
        </div>
      )}
    </li>
  );
}
