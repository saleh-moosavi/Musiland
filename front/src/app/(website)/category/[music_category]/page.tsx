import CategoryViewPage from "@/components/music-category/CategoryViewPage";
import Loading from "@/components/shared/Loading";
import { objectToQueryString } from "@/libs/objectToQueryString";
import { Suspense } from "react";

interface PropsType {
  params: { music_category: string };
  searchParams: { [key: string]: string | string[] };
}

export default function MusicCategoryPage({ params, searchParams }: PropsType) {
  const music_category = params.music_category;
  const decoded_music_category = decodeURIComponent(music_category);

  const stringQuery = objectToQueryString(searchParams);

  return (
    <Suspense fallback={<Loading />}>
      <CategoryViewPage query={stringQuery} title={decoded_music_category} />
    </Suspense>
  );
}
