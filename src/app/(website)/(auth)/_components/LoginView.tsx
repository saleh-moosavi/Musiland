"use client";
import z from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { loginUser } from "@/services/auth";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import FormButton from "@/components/FormButton";
import Loading from "@/components/shared/Loading";
import { LockIcon, MailIcon } from "lucide-react";
import CustomInput from "@/components/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import ChangeLoginRegister from "./ChangeLoginRegister";

const signInSchema = z.object({
  email: z.string().email("Please Enter Your email"),
  password: z.string().min(1, "Please Enter Your Password"),
});

type IFormType = z.infer<typeof signInSchema>;

export default function LoginView() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const [isLoading, setIsLoading] = useState(true);
  const { userData, setUserData } = useUserStore();
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm({ resolver: zodResolver(signInSchema) });

  useEffect(() => {
    if (userData) {
      router.push("/profile");
    } else {
      setIsLoading(false);
    }
  }, [userData]);

  const submitForm = async (data: IFormType) => {
    try {
      const result = await loginUser(data.email, data.password);

      if (result.success) {
        setUserData(result.data ?? null);
        router.push("/profile");
      } else {
        setError(result.message || "Email Or Password Is Incorrect!");
      }
    } catch (error) {
      setUserData(null);
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
        icon={<MailIcon />}
        name="Email"
        error={errors?.email?.message}
      />
      <CustomInput
        register={register("password")}
        icon={<LockIcon />}
        name="Password"
        error={errors?.password?.message}
      />

      <ChangeLoginRegister to="register" />
      {error && <p className="text-my-red-med">{error}</p>}

      <FormButton type="submit" isLoading={isSubmitting}>
        Sign In
      </FormButton>
    </form>
  );
}
