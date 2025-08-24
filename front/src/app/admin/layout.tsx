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
        <div className="flex gap-5 h-screen">
          <section className="h-full p-2">
            <SideBar />
          </section>
          <section className="p-10 w-full h-full flex justify-center items-center">
            {children}
          </section>
        </div>
      </body>
    </html>
  );
}
