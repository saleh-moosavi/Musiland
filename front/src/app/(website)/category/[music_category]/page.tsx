import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading";
import { objectToQueryString } from "@/libs/objectToQueryString";
import CategoryViewPage from "@/components/music-category/CategoryViewPage";

export async function generateMetadata({
  params,
}: {
  params: { music_category: string };
}): Promise<Metadata> {
  const music_category = decodeURIComponent((await params).music_category);
  return {
    title: music_category,
    description: `Search in ${music_category}`,
  };
}

interface PropsType {
  params: { music_category: string };
  searchParams: { [key: string]: string | string[] };
}

export default async function MusicCategoryPage({
  params,
  searchParams,
}: PropsType) {
  const music_category = (await params).music_category;
  const decoded_music_category = decodeURIComponent(music_category);
  const stringQuery = await objectToQueryString(await searchParams);

  return (
    <Suspense fallback={<Loading />}>
      <CategoryViewPage query={stringQuery} title={decoded_music_category} />
    </Suspense>
  );
}
