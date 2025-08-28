"use client";

import { UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import useToastStore from "@/store/toastStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { iconClasses } from "@/constants/styleClasses";
import CustomInput from "@/components/auth/CustomInput";
import { addSingerSchema } from "@/constants/zodSchema";
import { useRouter, useSearchParams } from "next/navigation";

type Mode = "add" | "edit";

export default function SingerForm({ mode }: { mode: Mode }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const singerId = searchParams.get("singerId");
  const singerName = searchParams.get("singerName");
  const [error, setError] = useState<string | null>(null);
  const { setIsToastOpen, setToastTitle, setToastColor } = useToastStore();

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(addSingerSchema),
  });

  useEffect(() => {
    if (mode === "edit" && singerName) {
      reset({ name: singerName });
    }
  }, [mode, singerName, reset]);

  const onSubmit = async (data: { name: string }) => {
    setError(null);

    const url =
      mode === "add"
        ? `${process.env.NEXT_PUBLIC_API_URL}/singers`
        : `${process.env.NEXT_PUBLIC_API_URL}/singers/${singerId}`;

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
        setIsToastOpen(true);
        setToastTitle(
          `Singer ${mode === "add" ? "added" : "updated"} successfully!`
        );
        setToastColor("green");
        router.push("/admin/dashboard/singer");
      } else {
        setError(result.error?.message || "Operation failed.");
        setIsToastOpen(true);
        setToastTitle(result.error?.message || "Operation failed.");
        setToastColor("red");
      }
    } catch (err) {
      setError("Server connection error.");
    }
  };

  return (
    <article className="max-w-md min-w-md mx-auto overflow-hidden p-5 rounded-3xl bg-slate-100 dark:bg-slate-800 mt-10 shadow dark:shadow-white/30 text-black dark:text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-10">
        <h3 className="text-center">
          {mode === "add" ? "Add" : "Edit"} Singer
        </h3>

        <CustomInput
          register={register("name")}
          icon={<UserIcon className={iconClasses} />}
          name="Enter Name of Singer"
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
            ? "Add Singer"
            : "Update Singer"}
        </button>
      </form>
    </article>
  );
}
