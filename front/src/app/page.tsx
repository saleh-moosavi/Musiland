import HeroCarousel from "@/components/home/HeroCarousel";
import Slider from "@/components/shared/Slider";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10 mb-5">
      <p className="font-semibold">Feel The Soul of Music</p>
      <HeroCarousel />
      <Slider title="Special Songs" query="filters[likes][$gt]=-1" />
      <Slider title="Newest Songs" query="filters[likes][$gt]=-1" />
      <Slider title="Most Popular Songs" query="filters[likes][$gt]=-1" />
    </div>
  );
}
