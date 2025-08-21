import "../globals.css";
import type { Metadata } from "next";
import SideBar from "@/components/admin/SideBar";

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
      <body className="bg-white dark:bg-gray-600">
        <div className="flex w-full h-full items-center gap-5">
          <section className="bg-white sticky left-0 inset-y-0">
            <SideBar />
          </section>
          <section className="w-full">{children}</section>
        </div>
      </body>
    </html>
  );
}
