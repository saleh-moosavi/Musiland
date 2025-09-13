"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import Loading from "@/components/shared/Loading";
import checkSavedData from "@/libs/checkSavedData";
import ProfileBtn from "@/components/profile/ProfileBtn";

type User = {
  name: string;
  email: string;
  role: string;
};

export default function ProfileView() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { isLoggedIn, setIsLoggedIn } = useUserStore();

  useEffect(() => {
    async function fetchUser() {
      if (!isLoggedIn) {
        router.push("/login");
      } else {
        const res = await checkSavedData();
        res && setUser(res);
      }
    }

    fetchUser();
  }, [isLoggedIn]);

  const handleLogOUt = async () => {
    const res = await fetch("/api/logout", {
      method: "POST",
      credentials: "include",
    });

    if (res.ok) {
      setIsLoggedIn(false);
      router.push("/login");
    } else {
      console.error("Logout failed");
    }
  };

  if (!user) {
    return <Loading />;
  }

  return (
    <div className="p-2 flex flex-col items-center gap-10 dark:text-my-white-low">
      <h1 className="text-xl font-semibold">Your Profile</h1>
      <section className="grid grid-cols-5 w-full">
        <ul className="list-none flex flex-col gap-10 col-span-4">
          <li>
            <strong>Username:</strong> {user.name}
          </li>
          <li>
            <strong>Email:</strong> {user.email}
          </li>
          <li>
            <strong>Role: </strong>
            {user.role}
          </li>
        </ul>
        <article className="col-span-1 p-5 flex flex-col *:hover:cursor-pointer gap-5 bg-my-white-low dark:bg-my-black-max shadow-md shadow-my-black-low/50 rounded-2xl">
          {user && (user.role === "admin" || user.role === "manager") && (
            <Link href="/admin/dashboard">
              <ProfileBtn>Admin Panel</ProfileBtn>
            </Link>
          )}

          <ProfileBtn>Comments</ProfileBtn>
          <ProfileBtn>Likes</ProfileBtn>
          <ProfileBtn clickHandler={handleLogOUt} type="logout">
            log out
          </ProfileBtn>
        </article>
      </section>
    </div>
  );
}
