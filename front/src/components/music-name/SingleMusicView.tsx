import PlayButton from "./PlayButton";

export default function SingleMusicView({ song }: any) {
  if (!song) {
    return (
      <div className="text-red-500 font-bold text-center mt-5">
        آهنگ پیدا نشد
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 items-start gap-10 w-full">
      <img
        className="col-span-1 lg:w-96 object-cover rounded-3xl h-full w-full"
        src={song.coverUrl}
        alt={song.name}
      />
      <section className="col-span-1 flex flex-col *:w-full h-full justify-between items-start">
        <div>
          <h3 className="font-semibold text-3xl">{song.singer?.name}</h3>
          <p className="font-semibold text-lg">
            {song.name} (Album: {song.singer?.name || "Unknown"})
          </p>
          <p className="font-semibold my-10">
            Genre:{" "}
            {song.genres && song.genres.length > 0
              ? song.genres?.map((g: any) => g.name).join(", ")
              : "Unknown"}
          </p>
          <p className="font-semibold my-10">
            Genre:{" "}
            {song.playlists && song.playlists.length > 0
              ? song.playlists?.map((p: any) => p.name).join(", ")
              : "Unknown"}
          </p>
        </div>
        <div className="space-y-5">
          <div className="flex items-center gap-5">
            <button className="w-full py-2 border rounded-xl border-gray-400 text-sm">
              Download 320
            </button>
            <button className="w-full py-2 border rounded-xl border-gray-400 text-sm">
              Download 128
            </button>
          </div>
          <PlayButton audio={song.audioUrl} />

          <div className="flex gap-5 items-center text-sm justify-between">
            <p>{song.comments?.length} Comments</p>
            <p>{song.likes} Likes</p>
            <p>Published at {song.releaseDate}</p>
          </div>
        </div>
      </section>
      <div className="col-span-1">
        <h3 className="font-semibold text-lg">Song Lyrics : </h3>
        {song.lyric ? (
          <p className="text-sm font-semibold overflow-y-scroll max-h-96">
            {song.lyric}
          </p>
        ) : (
          <p className="text-sm font-semibold">No lyrics available</p>
        )}
      </div>
    </div>
  );
}
