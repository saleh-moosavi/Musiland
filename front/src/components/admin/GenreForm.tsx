"use client";

import { UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { iconClasses } from "@/constants/styleClasses";
import { addGenreSchema } from "@/constants/zodSchema";
import CustomInput from "@/components/auth/CustomInput";
import { useRouter, useSearchParams } from "next/navigation";

type Mode = "add" | "edit";

export default function GenreForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const genreId = searchParams.get("genreId");
  const genreName = searchParams.get("genreName");

  const [error, setError] = useState<string | null>(null);

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(addGenreSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect(() => {
    if (mode === "edit" && genreName) {
      reset({ name: genreName });
    }
  }, [mode, genreName, reset]);

  const onSubmit = async (data: { name: string }) => {
    setError(null);

    const url =
      mode === "add"
        ? `${process.env.NEXT_PUBLIC_API_URL}/genres/add`
        : `${process.env.NEXT_PUBLIC_API_URL}/genres/edit/${genreId}`;

    const method = mode === "add" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();

      if (res.ok) {
        reset();
        alert(`Genre ${mode === "add" ? "added" : "updated"} successfully!`);
        router.push("/admin/dashboard/genre");
      } else {
        setError(result.error?.message || "Operation failed.");
      }
    } catch (err) {
      setError("Server connection error.");
    }
  };

  return (
    <article className="max-w-md min-w-md mx-auto overflow-hidden p-5 rounded-3xl bg-slate-100 dark:bg-slate-800 mt-10 shadow dark:shadow-white/30 text-black dark:text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-10">
        <h3 className="text-center">{mode === "add" ? "Add" : "Edit"} Genre</h3>

        <CustomInput
          register={register("name")}
          icon={<UserIcon className={iconClasses} />}
          name="Enter Name of Genre"
          error={
            typeof errors.name?.message === "string"
              ? errors.name.message
              : undefined
          }
        />

        {error && <p className="text-red-500 text-sm ml-5">{error}</p>}

        <button
          disabled={isSubmitting}
          className="bg-gradient-to-r from-cyan-700 to-emerald-400 text-white px-4 py-2 w-full font-bold rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed"
          type="submit"
        >
          {isSubmitting
            ? "Saving..."
            : mode === "add"
            ? "Add Genre"
            : "Update Genre"}
        </button>
      </form>
    </article>
  );
}
