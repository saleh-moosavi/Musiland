"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import checkSavedData from "@/libs/checkSavedData";
import useUserStore from "@/store/userStore";
import Loading from "@/components/shared/Loading";

type User = {
  userName: string;
  email: string;
  createdAt: string;
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
    <div className="p-2 flex flex-col items-center gap-10 dark:text-white">
      <h1 className="text-xl font-semibold">Your Profile</h1>
      <section className="grid grid-cols-5 w-full">
        <ul className="list-none flex flex-col gap-10 col-span-4">
          <li>
            <strong>Username:</strong> {user.userName}
          </li>
          <li>
            <strong>Email:</strong> {user.email}
          </li>
          <li>
            <strong>Created At: </strong>
            {new Date(user.createdAt).toLocaleString()}
          </li>
        </ul>
        <article className="col-span-1 p-5 flex flex-col *:hover:cursor-pointer gap-5 bg-gray-500 rounded-3xl">
          <button className="bg-gray-800 px-4 py-2 min-w-52 rounded-full">
            Account
          </button>
          <button className="bg-gray-800 px-4 py-2 min-w-52 rounded-full">
            Likes
          </button>
          <button className="bg-gray-800 px-4 py-2 min-w-52 rounded-full">
            Comments
          </button>
          <button
            className="bg-red-400 px-4 py-2 min-w-52 rounded-full"
            onClick={handleLogOUt}
          >
            log out
          </button>
        </article>
      </section>
    </div>
  );
}
