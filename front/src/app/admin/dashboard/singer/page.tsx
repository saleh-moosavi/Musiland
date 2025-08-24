import Link from "next/link";

export default function SingerList() {
  return (
    <ul className="grid grid-cols-4 *:col-span-1 gap-5">
      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(
        (item) => {
          return (
            <li className="flex justify-between items-center bg-white p-2 rounded-full">
              <p>{item}</p>
              <article className="flex gap-2 items-center">
                <Link href={"/dashboard/singer"}>Edit</Link>
                <Link href={"/dashboard/singer"}>Delete</Link>
              </article>
            </li>
          );
        }
      )}
    </ul>
  );
}
