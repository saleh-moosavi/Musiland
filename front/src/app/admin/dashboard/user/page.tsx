import Link from "next/link";
import { GetUser } from "@/types/user";
import Button from "@/components/shared/Button";
import EditBtn from "@/components/admin/EditBtn";
import DeleteBtn from "@/components/admin/DeleteBtn";

export default async function page() {
  const data = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const users = await data.json();

  return (
    <section className="h-full w-full flex flex-col justify-start gap-10 dark:text-my-white-low">
      <Link href="/admin/dashboard/user/add" className="w-fit self-end">
        <Button text="User" type="button" />
      </Link>
      {users.length > 0 ? (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 *:col-span-1 gap-5 w-full">
          {users.map((user: GetUser) => {
            return (
              <li
                className="w-full flex justify-between items-center gap-5 bg-my-white-low dark:bg-my-black-max shadow-md shadow-my-black-low/30 p-5 rounded-xl"
                key={user?._id}
              >
                <p>
                  {user.name} |{" "}
                  {user.role.replace(/\b\w/g, (char: string) =>
                    char.toUpperCase()
                  )}
                </p>
                <article className="flex gap-5 items-center">
                  <EditBtn id={user._id} name={user.name} type="user" />
                  <DeleteBtn id={user._id} name={user.name} type="user" />
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <p className="text-center">Sorry There Is No User</p>
      )}
    </section>
  );
}
