import Link from "next/link";
import Button from "@/components/shared/Button";
import EditBtn from "@/components/admin/EditBtn";
import DeleteBtn from "@/components/admin/DeleteBtn";
import { deleteSinger, getAllSingers } from "@/services/singer";

export default async function SingerList() {
  const data = await getAllSingers();
  const singers = data.data;

  return (
    <section className="h-full w-full flex flex-col justify-start gap-10 dark:text-my-white-low">
      <Link href="/admin/dashboard/singer/add" className="w-fit self-end">
        <Button text="Singer" type="button" />
      </Link>
      {data.success && singers.length > 0 ? (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 *:col-span-1 gap-5 w-full">
          {singers.map((singer) => {
            return (
              <li
                className="w-full flex justify-between items-center gap-5 bg-my-white-low dark:bg-my-black-max shadow-md shadow-my-black-low/30 p-5 rounded-xl"
                key={singer?._id}
              >
                <p>{singer.name}</p>
                <article className="flex gap-5 items-center">
                  <EditBtn id={singer._id} name={singer.name} type="singer" />
                  <DeleteBtn
                    type="singer"
                    id={singer._id}
                    name={singer.name}
                    deleteFn={deleteSinger}
                  />
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center">Sorry There Is No Singer</p>
      )}
    </section>
  );
}
