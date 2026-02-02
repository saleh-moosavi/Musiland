"use client";
import "./globals.css";
import useAuth from "@/hooks/useAuth";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLayoutEffect } from "react";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
      retry: 3,
      refetchOnWindowFocus: true,
    },
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { checkAuth } = useAuth();

  useLayoutEffect(() => {
    checkAuth();
  });
  return (
    <html lang="en">
      <QueryClientProvider client={queryClient}>
        <body className="bg-my-white-med dark:bg-my-black-high">
          {children}
        </body>
      </QueryClientProvider>
    </html>
  );
}
