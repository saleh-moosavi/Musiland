import { Suspense } from "react";
import Loading from "@/components/shared/Loading";
import { objectToQueryString } from "@/libs/objectToQueryString";
import CategoryViewPage from "@/components/music-category/CategoryViewPage";

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
  const stringQuery = objectToQueryString(await searchParams);

  return (
    <Suspense fallback={<Loading />}>
      <CategoryViewPage query={stringQuery} title={decoded_music_category} />
    </Suspense>
  );
}
