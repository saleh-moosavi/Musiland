import Link from "next/link";
import FormButton from "@/components/FormButton";
import EditBtn from "@/app/admin/_components/EditBtn";
import AlterّResult from "../../_components/AlterResult";
import DeleteBtn from "@/app/admin/_components/DeleteBtn";
import { deleteGenre, getAllGenres } from "@/services/genre";

export default async function GenreList() {
  const data = await getAllGenres();
  const genres = data.data;

  return (
    <section className="h-full w-full flex flex-col justify-start gap-10 dark:text-my-white-low">
      <Link href="/admin/dashboard/genre/add" className="w-fit self-end">
        <FormButton type="button">Add Genre</FormButton>
      </Link>
      {data.success && genres && genres.length > 0 ? (
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
                  <DeleteBtn
                    type="genre"
                    id={genre._id}
                    name={genre.name}
                    deleteFn={deleteGenre}
                  />
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <AlterّResult title={data.message || "There Is No Genre"} />
      )}
    </section>
  );
}
