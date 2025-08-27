import Link from "next/link";
import EditBtn from "@/components/admin/EditBtn";
import DeleteBtn from "@/components/admin/DeleteBtn";

export default async function SingerList() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/singers`);
  const singers = await data.json();
  return (
    <section className="h-full w-full flex flex-col justify-start gap-10">
      <Link
        href="/admin/dashboard/singer/add"
        className="w-fit bg-gradient-to-r from-cyan-700 to-emerald-400 text-white px-4 py-2 font-bold rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer self-end"
      >
        Add Singer
      </Link>
      <ul className="grid grid-cols-3 *:col-span-1 gap-5 w-full">
        {singers.map((singer: any) => {
          return (
            <li
              className="w-full flex justify-between items-center gap-5 bg-white p-5 rounded-xl"
              key={singer?._id}
            >
              <p>{singer.name}</p>
              <article className="flex gap-5 items-center">
                <EditBtn id={singer._id} name={singer.name} type="singer" />
                <DeleteBtn id={singer._id} name={singer.name} type="singer" />
              </article>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
