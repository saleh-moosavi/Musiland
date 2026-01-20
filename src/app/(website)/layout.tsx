import { lazy } from "react";
import type { Metadata } from "next";
import Navbar from "@/components/shared/Navbar";
import Player from "@/components/shared/Player";
const Toast = lazy(() => import("@/components/shared/Toast"));
const SameSongs = lazy(() => import("@/components/SameSongs"));

export const metadata: Metadata = {
  title: {
    default: "Musiland",
    template: "Musiland | %s",
  },
  description: "Listen to songs and music on Musiland",
  openGraph: {
    title: "Musiland - Listen to Newest Songs",
    description: "Listen to songs and music on Musiland",
    url: "https://musiland.com",
    siteName: "Musiland",
    images: [
      {
        url: "http://localhost:3000/_next/image?url=%2FLogo-dark.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Toast />
      <Navbar />
      <main className="min-h-[70vh] max-w-[90rem] py-28 mx-5 xl:mx-auto">
        {children}
        <SameSongs />
      </main>
      <Player />
    </>
  );
}
