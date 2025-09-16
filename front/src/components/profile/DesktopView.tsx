import Link from "next/link";
import ProfileBtn from "./ProfileBtn";
import { userProfileType } from "@/types/user";

export default function DesktopView({
  userData,
  logOut,
}: {
  userData: userProfileType;
  logOut: () => Promise<void>;
}) {
  if (userData === null) {
    return <p>User Not Found</p>;
  }
  return (
    <article className="hidden p-5 md:flex flex-col *:hover:cursor-pointer gap-5 bg-my-white-low dark:bg-my-black-max shadow-md shadow-my-black-low/50 rounded-2xl">
      {userData &&
        (userData.role === "admin" || userData.role === "manager") && (
          <Link href="/admin/dashboard">
            <ProfileBtn title="Admin Panel" />
          </Link>
        )}

      <ProfileBtn title="Comments" />
      <ProfileBtn title="Likes" />
      <ProfileBtn clickHandler={logOut} type="logout" title="log out" />
    </article>
  );
}
