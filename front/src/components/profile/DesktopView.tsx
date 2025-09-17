import Link from "next/link";
import ProfileBtn from "./ProfileBtn";

export default function DesktopView({
  role,
  logOut,
}: {
  role: string;
  logOut: () => Promise<void>;
}) {
  if (role === null) {
    return <p>User Not Found</p>;
  }
  return (
    <article className="hidden p-5 md:flex flex-col *:hover:cursor-pointer gap-5 bg-my-white-low dark:bg-my-black-max shadow-md shadow-my-black-low/50 rounded-2xl">
      {role && (role === "admin" || role === "manager") && (
        <Link href="/admin/dashboard">
          <ProfileBtn title="Admin Panel" />
        </Link>
      )}

      <ProfileBtn title="Comments" />
      <Link href="/profile/like">
        <ProfileBtn title="Likes" />
      </Link>
      <ProfileBtn clickHandler={logOut} type="logout" title="log out" />
    </article>
  );
}
