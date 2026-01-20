"use client";
import { X } from "lucide-react";
import { ReactNode } from "react";
import useSameSongsStore from "@/store/sameSongStore";

export default function SameSongWrapper({ children }: { children: ReactNode }) {
  const { isPanelVisible, setIsPanelVisible } = useSameSongsStore();
  return (
    <div
      className={`fixed inset-0 my-20 z-[60] p-5 ${
        isPanelVisible ? "" : "hidden"
      }`}
    >
      <article className="max-w-[90rem] mx-auto w-full h-full bg-my-white-low dark:bg-my-black-max rounded-3xl px-5 pb-5 overflow-y-scroll overscroll-y-contain shadow-md shadow-my-black-med/20 dark:shadow-my-white-med/20">
        <div className="flex justify-between items-center sticky top-0 dark:text-my-white-low py-5 z-20">
          <p className="select-none font-semibold">Similar Songs</p>
          <X
            className="hover:stroke-my-red-med transition-all duration-200 cursor-pointer"
            onClick={() => setIsPanelVisible(false)}
          />
        </div>
        {children}
      </article>
    </div>
  );
}
