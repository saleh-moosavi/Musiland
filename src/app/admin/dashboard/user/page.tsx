import Link from "next/link";
import { IUser } from "@/services/user";
import FormButton from "@/components/FormButton";
import EditBtn from "@/app/admin/_components/EditBtn";
import AlterّResult from "../../_components/AlterResult";
import DeleteBtn from "@/app/admin/_components/DeleteBtn";
import { deleteUser, getAllUsers } from "@/services/user";

export default async function page() {
  const data = await getAllUsers();
  const users = data.data || [];

  return (
    <section className="h-full w-full flex flex-col justify-start gap-10 dark:text-my-white-low">
      <Link href="/admin/dashboard/user/add" className="w-fit self-end">
        <FormButton type="button">Add User</FormButton>
      </Link>
      {users.length > 0 ? (
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 *:col-span-1 gap-5 w-full">
          {users.map((user: IUser) => {
            return (
              <li
                className="w-full flex justify-between items-center gap-5 bg-my-white-low dark:bg-my-black-max shadow-md shadow-my-black-low/30 p-5 rounded-xl"
                key={user?.id}
              >
                <p>
                  {user.name} |{" "}
                  {user.role.replace(/\b\w/g, (char: string) =>
                    char.toUpperCase(),
                  )}
                </p>
                <article className="flex gap-5 items-center">
                  <EditBtn id={user.id} name={user.name} type="user" />
                  <DeleteBtn
                    id={user.id}
                    name={user.name}
                    type="user"
                    deleteFn={deleteUser}
                  />
                </article>
              </li>
            );
          })}
        </ul>
      ) : (
        <AlterّResult title={data.message || "There Is No User"} />
      )}
    </section>
  );
}
