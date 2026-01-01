import Link from "next/link";
import { links } from "@/constants/sidebarMenu";

export default function dashboardPage() {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full dark:text-my-white-low gap-10">
      <p className="text-xl font-bold ">WellCome To Admin Page</p>

      <ul className="grid justify-center grid-cols-2 md:grid-cols-3 items-start gap-10 *:col-span-1 *:cursor-pointer bg-my-white-low dark:bg-my-black-max p-10 rounded-3xl shadow-md shadow-my-black-low/50">
        {links.map((link) => {
          if (link.name !== "Dashboard") {
            return (
              <li
                key={link.path}
                className={`w-full hover:bg-my-black-low/30 transition-all duration-300 rounded-xl p-2`}
              >
                <Link
                  href={`/admin/dashboard/${link.path}`}
                  className="rounded flex flex-col sm:flex-row justify-start items-center gap-5 p-2"
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
