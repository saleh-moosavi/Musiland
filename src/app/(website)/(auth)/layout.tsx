"use client";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import React, { ReactNode, useLayoutEffect } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { userData } = useUserStore();

  useLayoutEffect(() => {
    if (userData) {
      router.push("/profile");
    }
  }, [userData, router]);

  return (
    <div className="max-w-md mx-auto overflow-hidden p-5 rounded-3xl bg-my-white-low dark:bg-my-black-max mt-10 shadow-md dark:shadow-my-black-low/50">
      {children}
    </div>
  );
}
