import Link from "next/link";

interface NavListProps {
  navbarData: any[];
  onMouseEnter: () => void;
  onMouseLeave: () => void;
}

const NavList: React.FC<NavListProps> = ({
  navbarData,
  onMouseEnter,
  onMouseLeave,
}) => {
  return (
    <article
      className="hidden lg:flex absolute top-20 -z-10 inset-x-0 mx-10 p-5 rounded-full bg-slate-100 shadow-md text-black"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <ul className="grid grid-cols-4 gap-2 *:row-span-1 *:col-span-1 *:justify-self-center w-full">
        {navbarData.map((item) => (
          <Link
            key={item.id}
            href={`/category/${item.name}?filters[$or][0][genres][name][$in]=${item.name}&filters[$or][1][playlists][name][$in]=${item.name}`}
          >
            <li className="cursor-pointer">{item.name}</li>
          </Link>
        ))}
      </ul>
    </article>
  );
};

export default NavList;
