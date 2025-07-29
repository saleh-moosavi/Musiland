"use client";
import React, { useEffect, useState } from "react";
import CustomInput from "./CustomInput";
import { LockIcon, MailIcon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import useUserStore from "@/store/userStore";
import { validateSignInForm } from "@/libs/validateSignInForm";
import Loading from "../shared/Loading";

const iconClasses =
  "absolute left-2 top-1/2 -translate-y-1/3 size-5 stroke-emerald-500";

export default function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>();
  const [isPending, setIsPending] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const { isLoggedIn, setIsLoggedIn } = useUserStore();

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/profile");
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsPending(true);

    const newErrors = validateSignInForm(email, password);
    setError(newErrors);

    if (Object.keys(newErrors).length === 0) {
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
    }

    setIsPending(false);
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-y-5">
      <CustomInput
        icon={<MailIcon className={iconClasses} />}
        name="Email"
        value={email}
        valueSetter={setEmail}
        error={error?.email}
      />
      <CustomInput
        icon={<LockIcon className={iconClasses} />}
        name="Password"
        value={password}
        valueSetter={setPassword}
        error={error?.password}
      />

      <h3 className="text-black dark:text-white">
        Don’t Have an Account?{" "}
        <Link href={`/register`} className="text-cyan-400 cursor-pointer">
          Register
        </Link>
      </h3>
      {error?.server && <p className="text-red-500">{error.server}</p>}
      <button
        disabled={isPending}
        className="bg-gradient-to-r from-cyan-700 to-emerald-400 text-white px-4 py-2 w-full font-bold rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
