import { Suspense } from "react";
import Loading from "@/components/shared/Loading";
import SingleMusicWrapper from "@/components/music-name/SingleMusicWrapper";

export default async function MusicNamePage({ params }: any) {
  const { music_name } = await params;
  const [, id] = decodeURIComponent(music_name).split("-");

  return (
    <Suspense fallback={<Loading />}>
      <SingleMusicWrapper id={id} />
    </Suspense>
  );
}
