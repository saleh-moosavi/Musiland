"use client";
import Link from "next/link";

export default function error({ reset }: { reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center h-[65vh] gap-10 text-center dark:text-white">
      <h2 className="text-2xl font-bold">Oops! Something went wrong.</h2>
      <h1 className="text-4xl font-bold">o_0</h1>
      <Link
        href="/"
        className="bg-gray-200 dark:bg-slate-800 px-4 py-2 rounded-3xl"
      >
        Go to Home
      </Link>
      <p>OR</p>
      <button
        className="bg-gray-200 dark:bg-slate-800 px-4 py-2 rounded-3xl cursor-pointer"
        onClick={reset}
      >
        Retry
      </button>
    </div>
  );
}
