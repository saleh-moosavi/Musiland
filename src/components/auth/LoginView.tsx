"use client";
import z from "zod";
import Link from "next/link";
import CustomInput from "./CustomInput";
import Loading from "../shared/Loading";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import { LockIcon, MailIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";

const signInSchema = z.object({
  email: z.string().email("Please Enter Your email"),
  password: z.string().min(1, "Please Enter Your Password"),
});

type IFormType = z.infer<typeof signInSchema>;

const iconClasses =
  "absolute left-2 top-1/2 -translate-y-1/2 size-5 stroke-emerald-500";

export default function LoginView() {
  const router = useRouter();
  const [error, setError] = useState<string>();
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

  const submitForm = async (data: IFormType) => {
    try {
      const result = await loginUser(data.email, data.password);

      if (result.success) {
        setIsLoggedIn(true);
        router.push("/profile");
      } else {
        setError(result.message || "Email Or Password Is Incorrect!");
      }
    } catch (error) {
      setIsLoggedIn(false);
      setError(error instanceof Error ? error.message : "Server Error!");
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

      <h3 className="text-my-black-max dark:text-my-white-low">
        Don’t Have an Account?{" "}
        <Link href={`/register`} className="text-my-blue-high cursor-pointer">
          Register
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
