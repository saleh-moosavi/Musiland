import Comments from "./Comments";
import Slider from "../shared/Slider";
import AddComment from "./AddComment";
import { GetSong } from "@/types/song";
import { getComment } from "@/types/comment";
import SingleMusicView from "./SingleMusicView";
import { generalItems } from "@/types/generalItems";

export default async function SingleMusicWrapper({ id }: { id: string }) {
  const getSong = async (): Promise<GetSong> => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/songs/${id}`);
    if (!res.ok) throw new Error("Failed to fetch song");
    return res.json();
  };

  const getComments = async (): Promise<getComment> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`
    );
    if (!res.ok) throw new Error("Failed to fetch comments");
    return res.json();
  };
  const [song, comments] = await Promise.all([getSong(), getComments()]);

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
