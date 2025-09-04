"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import Loading from "@/components/shared/Loading";
import CustomInput from "@/components/auth/CustomInput";
import { AtSign, LockIcon, MailIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/constants/zodSchema";

const iconClasses =
  "absolute left-2 top-1/2 -translate-y-1/2 size-5 stroke-emerald-500";

export default function RegisterView() {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();
  const [error, setError] = useState<any>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm({ resolver: zodResolver(signUpSchema) });

  useEffect(() => {
    if (isLoggedIn) {
      router.push("/profile");
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  const submitForm = async ({ username, email, password }: any) => {
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
        credentials: "include",
      });

      const result = await res.json();

      if (res.ok) {
        router.push("/profile");
      } else {
        setError({ server: result.error || "Register failed" });
      }
    } catch (err) {
      setError({ server: `Server Error! : ${err}` });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <form onSubmit={handleSubmit(submitForm)} className="grid gap-y-5">
      <CustomInput
        register={register("username")}
        icon={<AtSign className={iconClasses} />}
        name="Username"
        error={errors?.username?.message}
      />
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

      <h3 className="text-my-black-max dark:text-my-white-low">
        Do You Have an Account?{" "}
        <Link href={`/login`} className="text-my-blue-high cursor-pointer">
          Log In
        </Link>
      </h3>
      {error?.server && <p className="text-my-red-med">{error.server}</p>}
      <button
        disabled={isSubmitting}
        className="bg-gradient-to-r from-my-blue-high to-my-green-high text-my-white-low px-4 py-2 w-full font-bold rounded-md hover:opacity-80 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
}
