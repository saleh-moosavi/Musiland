"use client";
import "./globals.css";
import useAuth from "@/hooks/useAuth";
import { useLayoutEffect } from "react";
import { connectDB } from "@/configs/mongodb";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await connectDB();
  const { checkAuth } = useAuth();
  useLayoutEffect(() => {
    checkAuth();
  });
  return (
    <html lang="en">
      <body className="bg-my-white-med dark:bg-my-black-high">{children}</body>
    </html>
  );
}
