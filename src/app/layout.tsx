import "./globals.css";
import React from "react";
import { connectDB } from "@/configs/mongodb";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    await connectDB();
  return (
    <html lang="en">
      <body className="bg-my-white-med dark:bg-my-black-high">{children}</body>
    </html>
  );
}
