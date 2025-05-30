import { LogIn, Menu, Moon } from "lucide-react";
import Link from "next/link";

export default function Navbar() {
  return (
    <header className="pt-2 fixed top-0 inset-x-0 z-50 max-w-[90rem] mx-5 xl:mx-auto">
      <section className="flex justify-between w-full gap-x-20 shadow-lg p-5 bg-slate-100 sticky inset-0 rounded-full">
        <button>
          <Moon />
        </button>
        <div className="flex items-center justify-center">
          <ul className="items-center gap-x-10 hidden lg:flex">
            <li>About</li>
            <li>Contact</li>
          </ul>
          <Link href="/">
            <div className="relative lg:mx-20">
              <div className="w-18 lg:w-20 h-18 lg:h-20 flex place-content-center p-2 absolute inset-0 -top-5 -translate-x-1/2 bg-slate-100 rounded-full shadow-lg">
                <img src="/next.svg" alt="Logo" />
              </div>
            </div>
          </Link>
          <ul className="items-center gap-x-10 hidden lg:flex">
            <li>Musics</li>
            <li>Albums</li>
          </ul>
        </div>
        <Link href="http://localhost:1337">
          <button className="cursor-pointer">
            <LogIn className="hidden lg:block" />
            <Menu className="lg:hidden" />
          </button>
        </Link>
      </section>
    </header>
  );
}
