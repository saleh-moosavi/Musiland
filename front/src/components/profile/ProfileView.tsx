"use client";

import { useEffect } from "react";
import MobileView from "./MobileView";
import DesktopView from "./DesktopView";
import { useRouter } from "next/navigation";
import useAuthCheck from "@/hooks/useAuthCheck";
import Loading from "@/components/shared/Loading";

export default function ProfileView() {
  const router = useRouter();
  const { isLoggedIn, userData, isLoading, logOut } = useAuthCheck();

  useEffect(() => {
    if (!isLoading) return;
    if (!isLoggedIn) {
      router.push("/login");
    }
  }, [isLoading]);

  if (!userData) {
    return <Loading />;
  }

  return (
    <div className="p-2 flex flex-col items-center gap-3 md:gap-10 dark:text-my-white-low">
      <h1 className="text-xl font-semibold">Your Profile</h1>
      <section className="grid items-start md:flex md:items-start gap-10 w-full">
        <DesktopView userData={userData} logOut={logOut} />
        <MobileView userData={userData} logOut={logOut} />
        <ul className="list-none flex flex-col gap-10 justify-self-start">
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
      </section>
    </div>
  );
}
