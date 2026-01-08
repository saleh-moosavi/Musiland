import { lazy } from "react";
import { getSong } from "@/services/song";
import SingleMusicView from "./SingleMusicView";
import { getSongComments } from "@/services/comment";
import { IGenre } from "@/models/genre";
import { IPlaylist } from "@/models/playlist";
const Comments = lazy(() => import("./Comments"));
const AddComment = lazy(() => import("./AddComment"));
const Slider = lazy(() => import("../shared/Slider"));

export default async function SingleMusicWrapper({ id }: { id: string }) {
  const [songRes, commentRes] = await Promise.all([
    getSong(id),
    getSongComments(id),
  ]);

  const [song, comments] = [songRes.data, commentRes.data];
  if (song && song.name) {
    return (
      <>
        <SingleMusicView song={song} commentCount={comments.count} />
        <Comments comments={comments.data} commentCount={comments.count} />
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
        Song not found
      </div>
    );
  }
}
