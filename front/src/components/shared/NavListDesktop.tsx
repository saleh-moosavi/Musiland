import Link from "next/link";

interface NavListDesktopProps {
  navbarData: any[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  type: "genre" | "playlist";
}

const NavListDesktop: React.FC<NavListDesktopProps> = ({
  navbarData,
  onMouseEnter,
  onMouseLeave,
  type,
}) => {
  return (
    <article
      className="hidden lg:flex absolute top-24 -z-10 inset-x-0"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ul className="flex gap-x-10 gap-y-5 flex-wrap justify-between *:justify-self-center w-1/2 mx-auto p-5 rounded-2xl bg-slate-100 dark:bg-slate-800 shadow dark:shadow-white/20 text-black dark:text-white">
        {navbarData.map((item) => (
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
