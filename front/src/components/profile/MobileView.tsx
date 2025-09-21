import Link from "next/link";
import ProfileBtn from "./ProfileBtn";
import { Heart, LogOut, MessageSquareMore, ShieldUser } from "lucide-react";

export default function MobileView({
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
    <article className="md:hidden p-5 flex justify-around items-center *:hover:cursor-pointer gap-5 bg-my-white-low dark:bg-my-black-max shadow-md shadow-my-black-low/50 rounded-2xl">
      {role && (role === "admin" || role === "manager") && (
        <Link href="/admin/dashboard">
          <ProfileBtn title="Admin Panel" isMobile>
            <ShieldUser />
          </ProfileBtn>
        </Link>
      )}

      <Link href="/profile/comment">
        <ProfileBtn title="Comments" isMobile>
          <MessageSquareMore />
        </ProfileBtn>
      </Link>
      <Link href="/profile/like">
        <ProfileBtn title="Likes" isMobile>
          <Heart />
        </ProfileBtn>
      </Link>
      <ProfileBtn title="log out" clickHandler={logOut} type="logout" isMobile>
        <LogOut />
      </ProfileBtn>
    </article>
  );
}
