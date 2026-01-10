import Link from "next/link";
import { IGenre } from "@/models/genre";
import { IPlaylist } from "@/models/playlist";

interface IProps {
  navbarData: IGenre[] | IPlaylist[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  type: "genre" | "playlist";
}

const NavListDesktop = ({
  navbarData,
  onMouseEnter,
  onMouseLeave,
  type,
}: IProps) => {
  return (
    <article
      className="hidden lg:flex absolute top-24 -z-10 inset-x-0"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ul className="flex gap-x-10 gap-y-5 flex-wrap justify-between *:justify-self-center w-1/2 mx-auto p-5 rounded-2xl bg-my-white-low dark:bg-my-black-max shadow-md shadow-my-white-high dark:shadow-my-black-med text-my-black-max dark:text-my-white-low">
        {navbarData?.map((item) => (
          <Link
            key={item._id}
            href={`/category/${item.name}?${type}=${item.name}`}
          >
            <li className="cursor-pointer">{item.name}</li>
          </Link>
        ))}
      </ul>
    </article>
  );
};

export default NavListDesktop;
