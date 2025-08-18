"use client";
import Link from "next/link";
import CustomInput from "./CustomInput";
import Loading from "../shared/Loading";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import { LockIcon, MailIcon } from "lucide-react";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/constants/zodSchema";

const iconClasses =
  "absolute left-2 top-1/2 -translate-y-1/3 size-5 stroke-emerald-500";

export default function LoginView() {
  const router = useRouter();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState(true);
  const { isLoggedIn, setIsLoggedIn } = useUserStore();
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm({ resolver: zodResolver(signInSchema) });

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/profile");
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  const submitForm = async ({ email, password }: any) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
        }),
        credentials: "include",
      });

      const result = await res.json();

      if (res.ok) {
        localStorage.setItem("token", result.jwt);
        setIsLoggedIn(true);
        router.push("/profile");
      } else {
        setError({
          server: result.error?.message || "Email Or Password Is Incorrect!",
        });
      }
    } catch (err) {
      setError({ server: "Server Error!" });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="grid gap-y-5">
      <CustomInput
        register={register("email")}
        icon={<MailIcon className={iconClasses} />}
        name="Email"
        error={errors?.email?.message}
      />
      <CustomInput
        register={register("password")}
        icon={<LockIcon className={iconClasses} />}
        name="Password"
        error={errors?.password?.message}
      />

      <h3 className="text-black dark:text-white">
        Don’t Have an Account?{" "}
        <Link href={`/register`} className="text-cyan-400 cursor-pointer">
          Register
        </Link>
      </h3>
      {error?.server && <p className="text-red-500">{error.server}</p>}
      <button
        disabled={isSubmitting}
        className="bg-gradient-to-r from-cyan-700 to-emerald-400 text-white px-4 py-2 w-full font-bold rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
