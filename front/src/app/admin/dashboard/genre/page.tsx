import Link from "next/link";
import EditBtn from "@/components/admin/EditBtn";
import DeleteBtn from "@/components/admin/DeleteBtn";

export default async function GenreList() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/genres`);
  const genres = await data.json();
  return (
    <section className="h-full w-full flex flex-col justify-start gap-10">
      <Link
        href="/admin/dashboard/genre/add"
        className="w-fit bg-gradient-to-r from-cyan-700 to-emerald-400 text-white px-4 py-2 font-bold rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer self-end"
      >
        Add Genre
      </Link>
      {genres.length > 0 ? (
        <ul className="grid grid-cols-3 *:col-span-1 gap-5 w-full">
          {genres.map((genre: any) => {
            return (
              <li
                className="w-full flex justify-between items-center gap-5 bg-white p-5 rounded-xl"
                key={genre?._id}
              >
                <p>{genre.name}</p>
                <article className="flex gap-5 items-center">
                  <EditBtn id={genre._id} name={genre.name} type="genre" />
                  <DeleteBtn id={genre._id} name={genre.name} type="genre" />
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center dark:text-white">Sorry There Is No Genre</p>
      )}
    </section>
  );
}
