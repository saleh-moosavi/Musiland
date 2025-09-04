import Slider from "@/components/shared/Slider";
import HeroCarousel from "@/components/home/HeroCarousel";

export default function Home() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center gap-10 mb-5">
      <p className="font-semibold dark:text-white">Feel The Soul of Music</p>
      <HeroCarousel />
      <Slider title="Newest Songs" query="sort=date,dec" />
      <Slider title="Most Popular Songs" query="sort=likes,dec" />
      <Slider title="Oldets Songs" query="sort=date" />
    </div>
  );
}
