import SingleMusicViewPage from "@/components/music-name/SingleMusicViewPage";
import Loading from "@/components/shared/Loading";
import { Suspense } from "react";

export default async function MusicNamePage({ params }: any) {
  const { music_name } = await params;
  const [, id] = decodeURIComponent(music_name).split(" - ");

  return (
    <Suspense fallback={<Loading />}>
      <SingleMusicViewPage id={id} />
    </Suspense>
  );
}
