import Link from "next/link";
import PlayButton from "../shared/PlayButton";

export default function SingleMusicView({ song }: any) {
  if (!song) {
    return (
      <div className="text-my-red-med font-bold text-center mt-5">
        آهنگ پیدا نشد
      </div>
    );
  }

  return (
    <div className="grid lg:grid-cols-3 items-start gap-10 w-full dark:text-my-white-low">
      <img
        className="col-span-1 lg:w-96 object-cover rounded-3xl h-full w-full"
        src={song.coverUrl}
        alt={song.name}
      />
      <section className="col-span-1 flex flex-col *:w-full h-full justify-between items-start">
        <div className="space-y-2">
          <h3 className="font-semibold text-3xl">{song.singer?.name}</h3>
          <p className="font-semibold">{song.name}</p>
          <p className="font-semibold">
            Album: {song.album?.name || "Unknown"}
          </p>
          {/* genres section */}
          <ul className="font-semibold my-10 flex items-center gap-3">
            Genre:{" "}
            {song.genres && song.genres.length > 0
              ? song.genres.map((g: any) => (
                  <li key={g._id}>
                    <Link href={`/category/${g.name}?${`genre=${g.name}`}`}>
                      {g.name}
                    </Link>
                  </li>
                ))
              : "Unknown"}
          </ul>
          {/* playlist section */}
          <ul className="font-semibold my-10 flex items-center gap-3">
            playlist:{" "}
            {song.playlists && song.playlists.length > 0
              ? song.playlists?.map((p: any) => (
                  <li key={p._id}>
                    <Link href={`/category/${p.name}?${`playlist=${p.name}`}`}>
                      {p.name}
                    </Link>
                  </li>
                ))
              : "Unknown"}
          </ul>
        </div>
        <div className="space-y-5">
          <a
            download={true}
            href={song.audioUrl}
            target="_blank"
            className="w-full text-center inline-block py-2 shadow-md shadow-my-black-low/50 dark:shadow-my-black-med/50 hover:shadow-my-black-low dark:hover:shadow-my-black-med rounded-lg text-sm cursor-pointer bg-my-white-low dark:bg-my-black-max transition-all duration-300"
          >
            Download
          </a>
          <PlayButton song={song} />

          <div className="flex gap-5 items-center text-sm justify-between">
            <p>{song.comments?.length} Comments</p>
            <p>{song.likes} Likes</p>
            <p>{song.createdAt.split("T")[0]}</p>
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
