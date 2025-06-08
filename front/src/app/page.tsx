import { Suspense, lazy } from "react";
import Loading from "@/components/shared/Loading";

const HeroCarousel = lazy(() => import("@/components/home/HeroCarousel"));
const Slider = lazy(() => import("@/components/shared/Slider"));

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10 mb-5">
      <p className="font-semibold">Feel The Soul of Music</p>
      <HeroCarousel />
      <Suspense fallback={<Loading />}>
        <Slider
          title="Special Songs"
          query="filters[likes][$gt]=-1&pagination[limit]=10&sort=publishedAt:desc"
        />
        <Slider
          title="Newest Songs"
          query="filters[likes][$gt]=-1&pagination[limit]=10&sort=publishedAt:desc"
        />
        <Slider
          title="Most Popular Songs"
          query="filters[likes][$gt]=-1&pagination[limit]=10&sort=publishedAt:desc"
        />
      </Suspense>
    </div>
  );
}
