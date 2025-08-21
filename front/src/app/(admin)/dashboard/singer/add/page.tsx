"use client";
import { useState } from "react";
import { UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import CustomInput from "../../../../../components/auth/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { iconClasses } from "@/constants/styleClasses";
import { addSingerSchema } from "@/constants/zodSchema";

export default function AddSinger() {
  const [error, setError] = useState<any>();
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
  } = useForm({ resolver: zodResolver(addSingerSchema) });

  const submitForm = async ({ name }: any) => {
    try {
      const res = await fetch("http://localhost:8000/api/singers/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
        }),
        credentials: "include",
      });

      const result = await res.json();

      if (res.ok) {
        reset();
        alert("Singer Added Successfully");
      } else {
        setError({
          server: result.error?.message || "Email Or Password Is Incorrect!",
        });
      }
    } catch (err) {
      setError({ server: "Server Error!" });
    }
  };

  return (
    <article className="max-w-md mx-auto overflow-hidden p-5 rounded-3xl bg-slate-100 dark:bg-slate-800 mt-10 shadow dark:shadow-white/30 text-black dark:text-white">
      <form onSubmit={handleSubmit(submitForm)} className="grid gap-y-10">
        <h3 className="text-center">Add Singer</h3>
        <CustomInput
          register={register("name")}
          icon={<UserIcon className={iconClasses} />}
          name="Enter Name of Singer"
          error={errors?.name?.message}
        />
        {error?.server && <p className="text-red-500">{error.server}</p>}
        <button
          disabled={isSubmitting}
          className="bg-gradient-to-r from-cyan-700 to-emerald-400 text-white px-4 py-2 w-full font-bold rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
          type="submit"
        >
          Add
        </button>
      </form>
    </article>
  );
}
