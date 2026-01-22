import { lazy } from "react";
import type { Metadata } from "next";
import SideBar from "@/app/admin/_components/SideBar";
import DeleteConfirm from "@/components/PopUp";
import SideBarMobile from "@/app/admin/_components/SideBarMobile";
const Toast = lazy(() => import("@/components/Toast"));

export const metadata: Metadata = {
  title: "Administrator",
  description: "Made By Saleh",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex gap-5 h-screen relative">
      <section className="hidden md:block h-full p-2">
        <SideBar />
      </section>
      <SideBarMobile />
      <section className="p-5 md:p-10 w-full h-full flex justify-center items-center">
        {children}
      </section>
      <DeleteConfirm />
      <Toast />
    </main>
  );
}
