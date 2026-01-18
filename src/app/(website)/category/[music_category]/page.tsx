import { Metadata } from "next";
import { getAllSongs } from "@/services/song";
import { objectToQueryString } from "@/libs/objectToQueryString";
import CategoryItems from "@/app/(website)/category/_components/CategoryItems";

interface IProps {
  params: { music_category: string };
  searchParams: { [key: string]: string | string[] };
}

export async function generateMetadata({ params }: IProps): Promise<Metadata> {
  const music_category = decodeURIComponent((await params).music_category);
  return {
    title: music_category,
    description: `Search in ${music_category}`,
  };
}

export default async function MusicCategoryPage({
  params,
  searchParams,
}: IProps) {
  const music_category = (await params).music_category;
  const decoded_music_category = decodeURIComponent(music_category);
  const stringQuery = await objectToQueryString(await searchParams);
  const res = await getAllSongs(stringQuery);
  const songs = res.data;

  if (res.success && songs && songs.length > 0) {
    return (
      <>
        <h2 className="mb-5 text-center font-semibold text-lg dark:text-my-white-low">
          {decoded_music_category.toLocaleLowerCase().includes("song")
            ? decoded_music_category
            : decoded_music_category + " Songs"}
        </h2>
        <CategoryItems songs={songs} />
      </>
    );
  } else {
    return (
      <div className="text-my-red-med font-bold text-center mt-5">
        Songs Not Found
      </div>
    );
  }
}
