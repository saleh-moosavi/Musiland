import Slider from "../shared/Slider";
import SingleMusicView from "./SingleMusicView";

export default async function SingleMusicViewPage({ id }: any) {
  const url = new URL(`http://localhost:1337/api/songs/${id}?populate=*`);
  const response = await fetch(url);
  const data: any = await response.json();
  const song = data.data;

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
          query={`filters[$or][0][genres][name][$in]=${song.genres
            .map((g: any) => g.name)
            .join(",")}&filters[$or][1][playlists][name][$in]=${song.playlists
            .map((p: any) => p.name)
            .join(",")}`}
        />
      </div>
    </>
  );
}
