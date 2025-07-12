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
  const url = new URL(`http://localhost:1337/api/songs?${query}&populate=*
`);
  const response = await fetch(url);
  const data: any = await response.json();
  const songs: any = data.data;

  return (
    <>
      <div className="flex items-center w-full gap-5 dark:text-white dark:border-white">
        <p className="shrink-0 text-sm font-semibold">{title}</p>
        <span className="w-full shrink h-[1px] translate-y-full bg-gray-300"></span>
        <Link
          href={`/category/${title}?${query}`}
          className="border px-4 py-1 rounded-lg shrink-0 cursor-pointer"
        >
          See More
        </Link>
      </div>
      <SliderView data={songs} />
    </>
  );
}
