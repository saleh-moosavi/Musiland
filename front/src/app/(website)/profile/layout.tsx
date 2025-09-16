"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthCheck from "@/hooks/useAuthCheck";
import Loading from "@/components/shared/Loading";
import MobileView from "@/components/profile/MobileView";
import DesktopView from "@/components/profile/DesktopView";

export default function profileLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        <DesktopView role={userData.role} logOut={logOut} />
        <MobileView role={userData.role} logOut={logOut} />
        {children}
      </section>
    </div>
  );
}
