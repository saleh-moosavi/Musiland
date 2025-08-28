"use client";

import { useEffect } from "react";
import useToastStore from "@/store/toastStore";

export default function Toast() {
  const { isToastOpen, toastTitle, toastColor, setIsToastOpen } =
    useToastStore();

  useEffect(() => {
    let timeOut: NodeJS.Timeout | undefined;
    if (isToastOpen) {
      timeOut = setTimeout(() => {
        setIsToastOpen(false); // Hide after 2 seconds
      }, 2000);
    }
    return () => {
      if (timeOut) {
        clearTimeout(timeOut); // Cleanup timeout only if it exists
      }
    };
  }, [isToastOpen]);

  const colorClasses = {
    green: "#22c55e",
    red: "#ef4444",
    orange: "#f97316 ",
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 z-[100000]">
      <div
        style={{ backgroundColor: colorClasses[toastColor] }}
        className={`fixed top-4 right-4 text-white px-4 py-2 rounded-xl shadow-lg transition-all duration-300 text-sm ${
          isToastOpen
            ? "opacity-100 translate-x-0"
            : "opacity-0 translate-x-full"
        }`}
      >
        {toastTitle}
      </div>
    </div>
  );
}
