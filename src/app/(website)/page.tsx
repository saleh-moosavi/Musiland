import { lazy } from "react";
import { Metadata } from "next";
import { SongQueries } from "@/constants";
import HeroCarousel from "@/app/(website)/_components/HeroCarousel";
const Slider = lazy(() => import("@/app/(website)/_components/Slider"));

export const metadata: Metadata = {
  title: "Home",
  description: "Newest Song and Musics",
};

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10 mb-5">
      <p className="font-semibold dark:text-white">Feel The Soul of Music</p>
      <HeroCarousel />
      <Slider
        title={SongQueries.newest.title}
        query={SongQueries.newest.query}
      />
      <Slider
        title={SongQueries.popular.title}
        query={SongQueries.popular.query}
      />
      <Slider
        title={SongQueries.oldets.title}
        query={SongQueries.oldets.query}
      />
    </div>
  );
}
