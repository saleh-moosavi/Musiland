"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthCheck from "@/hooks/useAuthCheck";
import Loading from "@/components/shared/Loading";
import ProfileBtn from "@/components/profile/ProfileBtn";

export default function ProfileView() {
  const router = useRouter();
  const { isLoggedIn, userData, isLoading, logOut } = useAuthCheck();

  useEffect(() => {
    if (!isLoading) return;
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoggedIn, isLoading]);

  if (!userData) {
    return <Loading />;
  }

  return (
    <div className="p-2 flex flex-col items-center gap-10 dark:text-my-white-low">
      <h1 className="text-xl font-semibold">Your Profile</h1>
      <section className="grid grid-cols-5 w-full">
        <ul className="list-none flex flex-col gap-10 col-span-4">
          <li>
            <strong>Username:</strong> {userData.name}
          </li>
          <li>
            <strong>Email:</strong> {userData.email}
          </li>
          <li>
            <strong>Role: </strong>
            {userData.role}
          </li>
        </ul>
        <article className="col-span-1 p-5 flex flex-col *:hover:cursor-pointer gap-5 bg-my-white-low dark:bg-my-black-max shadow-md shadow-my-black-low/50 rounded-2xl">
          {userData &&
            (userData.role === "admin" || userData.role === "manager") && (
              <Link href="/admin/dashboard">
                <ProfileBtn>Admin Panel</ProfileBtn>
              </Link>
            )}

          <ProfileBtn>Comments</ProfileBtn>
          <ProfileBtn>Likes</ProfileBtn>
          <ProfileBtn clickHandler={logOut} type="logout">
            log out
          </ProfileBtn>
        </article>
      </section>
    </div>
  );
}
