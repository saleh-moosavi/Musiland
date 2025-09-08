import "../globals.css";
import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Player from "@/components/shared/Player";
import SameSongs from "@/components/shared/SameSongs";

export const metadata: Metadata = {
  title: {
    default: "Musiland",
    template: "Musiland | %s",
  },
  description: "Listen to songs and music on Musiland",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-my-white-med dark:bg-my-black-high">
        <Navbar />
        <div className="min-h-[70vh] max-w-[90rem] py-28 mx-5 xl:mx-auto">
          {children}
          <SameSongs />
        </div>
        <Player />
      </body>
    </html>
  );
}
