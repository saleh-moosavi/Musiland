import { Metadata } from "next";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading";
import SingleMusicWrapper from "@/app/(website)/music/_components/SingleMusicWrapper";

export async function generateMetadata({
  params,
}: {
  params: { music_name: string };
}): Promise<Metadata> {
  const [name] = decodeURIComponent((await params).music_name).split("-");
  return {
    title: name,
    description: `Listen To ${name}`,
  };
}

export default async function MusicNamePage({
  params,
}: {
  params: { music_name: string };
}) {
  const { music_name } = await params;
  const [, id] = decodeURIComponent(music_name).split("-");

  return (
    <Suspense fallback={<Loading />}>
      <SingleMusicWrapper id={id} />
    </Suspense>
  );
}
