"use client";
import Link from "next/link";

export default function not_found() {
  return (
    <div className="flex flex-col items-center justify-center h-[65vh] gap-10 text-center dark:text-white">
      <h2 className="text-2xl font-bold">Sorry, page Not Found</h2>
      <h1 className="text-4xl font-bold">404</h1>
      <Link
        href="/admin/dashboard"
        className="bg-gray-200 px-4 py-2 rounded-3xl"
      >
        Go to Dashboard
      </Link>
    </div>
  );
}
