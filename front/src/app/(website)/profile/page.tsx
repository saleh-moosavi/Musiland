"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import Loading from "@/components/shared/Loading";
import checkSavedData from "@/libs/checkSavedData";
import Link from "next/link";

type User = {
  name: string;
  email: string;
  role: string;
};

export default function Page() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const { isLoggedIn, setIsLoggedIn } = useUserStore();

  useEffect(() => {
    async function fetchUser() {
      if (!isLoggedIn) {
        router.push("/login");
      } else {
        const res = await checkSavedData();
        res && setUser(res); // Make sure res matches User type
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
            <Link
              className="bg-my-white-med dark:bg-my-black-med px-4 py-2 min-w-52 rounded-xl text-center shadow-md shadow-my-black-low/50"
              href="/admin/dashboard"
            >
              Admin Panel
            </Link>
          )}
          <button className="bg-my-white-med dark:bg-my-black-med px-4 py-2 min-w-52 rounded-xl shadow-md shadow-my-black-low/50">
            Likes
          </button>
          <button className="bg-my-white-med dark:bg-my-black-med px-4 py-2 min-w-52 rounded-xl shadow-md shadow-my-black-low/50">
            Comments
          </button>
          <button
            className="bg-my-red-med px-4 py-2 min-w-52 rounded-xl shadow-md shadow-my-black-low/50"
            onClick={handleLogOUt}
          >
            log out
          </button>
        </article>
      </section>
    </div>
  );
}
