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
    `${process.env.NEXT_PUBLIC_API_URL}/songs?${query}&page=1,10&sort=date`
  );
  const songs: any = await response.json();

  return (
    <>
      <div className="flex items-center w-full gap-5 dark:text-white dark:border-white">
        <p className="shrink-0 text-sm font-semibold">{title}</p>
        <span className="w-full shrink h-[1px] translate-y-full bg-gray-300"></span>
        <Link
          href={`/category/${title}?${query}&sort=date`}
          className="border px-4 py-1 rounded-lg shrink-0 cursor-pointer"
        >
          See More
        </Link>
      </div>
      <SliderView data={songs} />
    </>
  );
}
