import Comments from "./Comments";
import Slider from "../shared/Slider";
import AddComment from "./AddComment";
import { getSong } from "@/services/song";
import SingleMusicView from "./SingleMusicView";
import { getComments } from "@/services/comment";
import { generalItems } from "@/types/generalItems";

export default async function SingleMusicWrapper({ id }: { id: string }) {
  const [song, comments] = await Promise.all([getSong(id), getComments(id)]);

  if (!song || typeof song !== "object" || Array.isArray(song)) {
    return (
      <div className="text-my-red-med font-bold text-center mt-5">
        Song not found
      </div>
    );
  }

  return (
    <>
      <SingleMusicView song={song} commentCount={comments.count} />
      <Comments comments={comments.data} commentCount={comments.count} />
      <AddComment id={song._id} />
      <div className="space-y-10 mt-10">
        <Slider
          title="Related Songs"
          query={`genre=${song.genres
            .map((g: generalItems) => g.name)
            .join(",")}&playlist=${song.playlists
            .map((p: generalItems) => p.name)
            .join(",")}`}
        />
      </div>
    </>
  );
}
