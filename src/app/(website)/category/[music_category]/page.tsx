import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading";
import { usicCategoryPropsTypeM } from "@/types/shared";
import { objectToQueryString } from "@/libs/objectToQueryString";
import CategoryViewPage from "@/components/music-category/CategoryViewPage";

export async function generateMetadata({
  params,
}: usicCategoryPropsTypeM): Promise<Metadata> {
  const music_category = decodeURIComponent((await params).music_category);
  return {
    title: music_category,
    description: `Search in ${music_category}`,
  };
}

export default async function MusicCategoryPage({
  params,
  searchParams,
}: usicCategoryPropsTypeM) {
  const music_category = (await params).music_category;
  const decoded_music_category = decodeURIComponent(music_category);
  const stringQuery = await objectToQueryString(await searchParams);

  return (
    <Suspense fallback={<Loading />}>
      <CategoryViewPage query={stringQuery} title={decoded_music_category} />
    </Suspense>
  );
}
