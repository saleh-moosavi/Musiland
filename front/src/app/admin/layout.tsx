import "../globals.css";
import type { Metadata } from "next";
import Toast from "@/components/shared/Toast";
import SideBar from "@/components/admin/SideBar";
import DeleteConfirm from "@/components/shared/PopUp";

export const metadata: Metadata = {
  title: "Administrator",
  description: "Made By Saleh",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body className="bg-my-white-med dark:bg-my-black-high">
        <div className="flex gap-5 h-screen relative">
          <section className="h-full p-2">
            <SideBar />
          </section>
          <section className="p-10 w-full h-full flex justify-center items-center">
            {children}
          </section>
          <DeleteConfirm />
          <Toast />
        </div>
      </body>
    </html>
  );
}
