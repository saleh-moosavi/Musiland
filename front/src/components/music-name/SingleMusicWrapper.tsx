import Slider from "../shared/Slider";
import SingleMusicView from "./SingleMusicView";

export default async function SingleMusicWrapper({ id }: { id: string }) {
  const url = new URL(`${process.env.NEXT_PUBLIC_API_URL}/songs/${id}`);
  const response = await fetch(url);
  const song: any = await response.json();

  if (!song || typeof song !== "object" || Array.isArray(song)) {
    return (
      <div className="text-red-500 font-bold text-center mt-5">
        Song not found
      </div>
    );
  }

  return (
    <>
      <SingleMusicView song={song} />
      <div className="space-y-10 mt-10">
        <Slider
          title="Related Songs"
          query={`genre=${song.genres
            .map((g: any) => g.name)
            .join(",")}&playlist=${song.playlists
            .map((p: any) => p.name)
            .join(",")}`}
        />
      </div>
    </>
  );
}
