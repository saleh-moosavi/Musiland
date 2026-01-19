import { lazy } from "react";
import { Metadata } from "next";
import { IGenre } from "@/models/genre";
import { getSong } from "@/services/song";
import { IPlaylist } from "@/models/playlist";
import { getSongComments } from "@/services/comment";
import SingleMusicView from "../_components/SingleMusicView";
/**************** Lazy Loads ****************/
const Comments = lazy(() => import("../_components/Comments"));
const AddComment = lazy(() => import("../_components/AddComment"));
const Slider = lazy(() => import("@/app/(website)/_components/Slider"));

/**************** Page Meta Data ****************/
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

/**************** Page View Component ****************/
export default async function MusicNamePage({
  params,
}: {
  params: { music_name: string };
}) {
  const { music_name } = await params;
  const [, id] = decodeURIComponent(music_name).split("-");
  const [songRes, commentRes] = await Promise.all([
    getSong(id),
    getSongComments(id),
  ]);
  const [song, comments] = [songRes.data, commentRes.data];

  if (songRes.success && song) {
    return (
      <>
        <SingleMusicView song={song} commentCount={comments?.length ?? 0} />
        <Comments
          comments={comments || []}
          commentCount={comments?.length ?? 0}
        />
        <AddComment id={song._id} />
        <div className="space-y-10 mt-10">
          <Slider
            title="Related Songs"
            query={`genre=${song.genre
              .map((g: IGenre) => g.name)
              .join(",")}&playlist=${song.playlist
              .map((p: IPlaylist) => p.name)
              .join(",")}`}
          />
        </div>
      </>
    );
  } else {
    return (
      <div className="text-my-red-med font-bold text-center mt-5">
        Song Not Found
      </div>
    );
  }
}
