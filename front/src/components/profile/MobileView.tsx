import Link from "next/link";
import ProfileBtn from "./ProfileBtn";
import { userProfileType } from "@/types/user";
import { Heart, LogOut, MessageSquareMore, ShieldUser } from "lucide-react";

export default function MobileView({
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
    <article className="md:hidden p-5 flex justify-around items-center *:hover:cursor-pointer gap-5 bg-my-white-low dark:bg-my-black-max shadow-md shadow-my-black-low/50 rounded-2xl">
      {userData &&
        (userData.role === "admin" || userData.role === "manager") && (
          <Link href="/admin/dashboard">
            <ProfileBtn title="Admin Panel" isMobile>
              <ShieldUser />
            </ProfileBtn>
          </Link>
        )}

      <ProfileBtn title="Comments" isMobile>
        <MessageSquareMore />
      </ProfileBtn>
      <ProfileBtn title="Likes" isMobile>
        <Heart />
      </ProfileBtn>
      <ProfileBtn title="log out" clickHandler={logOut} type="logout" isMobile>
        <LogOut />
      </ProfileBtn>
    </article>
  );
}
