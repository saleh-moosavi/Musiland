"use client";
import z from "zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import { registerUser } from "@/services/auth";
import Loading from "@/components/shared/Loading";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/auth/CustomInput";
import { AtSign, LockIcon, MailIcon } from "lucide-react";

const signUpSchema = z.object({
  username: z.string().min(1, "Please Enter Your Name"),
  email: z.string().email("Please Enter Your Email"),
  password: z.string().min(1, "Please Enter Your Password"),
});

const iconClasses =
  "absolute left-2 top-1/2 -translate-y-1/2 size-5 stroke-emerald-500";

export default function RegisterView() {
  const router = useRouter();
  const { isLoggedIn } = useUserStore();
  const [error, setError] = useState<string>();
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

  const submitForm = async ({
    username,
    email,
    password,
  }: {
    username: string;
    email: string;
    password: string;
  }) => {
    try {
      const res = await registerUser(username, email, password);

      if (res.success && res.data) {
        router.push("/profile");
      } else {
        setError(res.message || "Register failed");
      }
    } catch (err) {
      setError(`Server Error! : ${err}`);
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
      {error && <p className="text-my-red-med">{error}</p>}
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
