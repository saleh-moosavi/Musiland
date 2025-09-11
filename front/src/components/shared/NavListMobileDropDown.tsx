import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";
import useWindowStore from "@/store/windowStore";
import { generalItems } from "@/types/generalItems";

export default function NavListMobileDropDown({
  item,
}: {
  item:
    | {
        title: string;
        type: string;
        show: boolean;
        content: generalItems[];
        link?: undefined;
      }
    | {
        title: string;
        content: null;
        show: boolean;
        link: string;
        type?: undefined;
      };
}) {
  const [showSubNav, setShowSubNav] = useState(false);
  const { setShowMobileMenuPanel } = useWindowStore();
  const SharedClasses =
    "font-semibold block p-2 w-full shadow-sm space-y-2 rounded-xl hover:shadow-md dark:shadow-my-white-high transition-all duration-300";

  useEffect(() => {
    setShowSubNav(item.show);
  }, []);

  return (
    <li>
      {item.content ? (
        <p
          className={`flex justify-between items-center ${SharedClasses}`}
          onClick={() => setShowSubNav(!showSubNav)}
        >
          {item.title}
          <ChevronDown className="size-5" />
        </p>
      ) : (
        <Link
          href={item.link}
          className={SharedClasses}
          onClick={() => setShowMobileMenuPanel(false)}
        >
          {item.title}
        </Link>
      )}
      {item.content && (
        <div
          className={
            showSubNav
              ? "font-semibold p-2 bg-my-white-low dark:bg-my-black-high mt-2 w-full space-y-2 rounded-xl"
              : "hidden"
          }
        >
          {item.content.map((data: generalItems) => (
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
