import Link from "next/link";
import { links } from "@/constants/sidebarMenu";

export default function dashboardPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full dark:text-white gap-10">
      <p className="text-xl font-bold ">WellCome To Admin Page</p>

      <ul className="grid justify-center grid-cols-3 items-start gap-10 *:col-span-1 *:cursor-pointer bg-slate-100 dark:bg-slate-800 p-10 rounded-3xl">
        {links.map((link) => {
          if (link.name !== "Dashboard") {
            return (
              <li
                key={link.path}
                className={`w-full hover:bg-black/20 dark:hover:bg-white/20 transition-all duration-300 rounded-xl p-2`}
              >
                <Link
                  href={`/admin/dashboard/${link.path}`}
                  className="rounded flex justify-start items-center gap-5 p-2"
                >
                  <p className="*:size-5">{link.icon}</p>
                  <p>{link.name}</p>
                </Link>
              </li>
            );
          }
        })}
      </ul>
    </div>
  );
}
