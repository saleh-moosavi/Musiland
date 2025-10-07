import Link from "next/link";
import { getAllGenres } from "@/services/genre";
import Button from "@/components/shared/Button";
import EditBtn from "@/components/admin/EditBtn";
import { generalItems } from "@/types/generalItems";
import DeleteBtn from "@/components/admin/DeleteBtn";

export default async function GenreList() {
  const data = await getAllGenres();
  const genres: generalItems[] = data.data;

  if (genres.length < 1) {
    return (
      <p className="dark:text-my-red-med font-semibold">
        {data.error || "Something Went Wrong!!!"}
      </p>
    );
  }
  return (
    <section className="h-full w-full flex flex-col justify-start gap-10 dark:text-my-white-low">
      <Link href="/admin/dashboard/genre/add" className="w-fit self-end">
        <Button text="Genre" type="button" />
      </Link>
      {genres.length > 0 ? (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 *:col-span-1 gap-5 w-full">
          {genres.map((genre) => {
            return (
              <li
                className="w-full flex justify-between items-center gap-5 bg-my-white-low dark:bg-my-black-max shadow-md shadow-my-black-low/30 p-5 rounded-xl"
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
        <p className="text-center">Sorry There Is No Genre</p>
      )}
    </section>
  );
}
