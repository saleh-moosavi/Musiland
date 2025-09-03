import "swiper/css";
import Link from "next/link";
import SliderView from "./SliderView";

export default async function Slider({
  title,
  query,
}: {
  title: string;
  query: string;
}) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/songs?${query}&page=1,10`
  );
  const songs: any = await response.json();

  return (
    <>
      <div className="flex items-center w-full gap-5 dark:text-my-white-low dark:border-my-white-low">
        <p className="shrink-0 text-sm font-semibold">{title}</p>
        <span className="w-full shrink h-[1px] translate-y-full dark:bg-my-white-low bg-my-black-low"></span>
        <Link
          href={`/category/${title}?${query}&sort=date`}
          className="border dark:hover:border-my-green-med dark:hover:text-my-green-med hover:text-my-green-high hover:border-my-green-high  px-4 py-1 rounded-lg shrink-0 cursor-pointer transition-all duration-300"
        >
          See More
        </Link>
      </div>
      <SliderView data={songs} />
    </>
  );
}
