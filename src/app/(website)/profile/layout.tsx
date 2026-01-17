"use client";
import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import Loading from "@/components/shared/Loading";
import MobileView from "@/app/(website)/profile/_components/MobileView";
import DesktopView from "@/app/(website)/profile/_components/DesktopView";

export default function ProfileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const { logOut } = useAuth();
  const { userData } = useUserStore();

  useEffect(() => {
    if (userData === null) {
      router.push("/login");
    }
  }, [userData]);

  if (!userData) {
    return <Loading />;
  }
  return (
    <div className="p-2 flex flex-col items-center gap-3 md:gap-10 dark:text-my-white-low">
      <h1 className="text-xl font-semibold">Your Profile</h1>
      <section className="grid items-start md:flex md:items-start gap-10 w-full">
        <div className="sticky top-24 z-50">
          <DesktopView role={userData.role} logOut={logOut} />
          <MobileView role={userData.role} logOut={logOut} />
        </div>
        <article className="w-full">{children}</article>
      </section>
    </div>
  );
}
