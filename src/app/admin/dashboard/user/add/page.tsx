import UserForm from "@/app/admin/_components/UserForm";

export default function page() {
  return (
    <article className="p-6 rounded-3xl bg-my-white-low dark:bg-my-black-max mt-10 shadow-md dark:shadow-my-black-low/30 text-my-black-max dark:text-my-white-low space-y-6">
      <h3 className="text-center text-2xl font-semibold">Edit User</h3>
      <UserForm mode="add" />
    </article>
  );
}
