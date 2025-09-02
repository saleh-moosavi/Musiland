import { Suspense, lazy } from "react";
import Loading from "@/components/shared/Loading";

const HeroCarousel = lazy(() => import("@/components/home/HeroCarousel"));
const Slider = lazy(() => import("@/components/shared/Slider"));

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10 mb-5">
      <p className="font-semibold dark:text-white">Feel The Soul of Music</p>
      <HeroCarousel />
      <Suspense fallback={<Loading />}>
        <Slider title="Newest Songs" query="sort=date,dec" />
        <Slider title="Most Popular Songs" query="sort=likes,dec" />
        <Slider title="Oldets Songs" query="sort=date" />
      </Suspense>
    </div>
  );
}
