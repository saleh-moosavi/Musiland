"use client";
import z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { registerUser } from "@/services/auth";
import FormButton from "@/components/FormButton";
import CustomInput from "@/components/CustomInput";
import { zodResolver } from "@hookform/resolvers/zod";
import ChangeLoginRegister from "./ChangeLoginRegister";
import { AtSign, LockIcon, MailIcon } from "lucide-react";

const signUpSchema = z.object({
  name: z.string().min(1, "Please Enter Your Name"),
  email: z.string().email("Please Enter Your Email"),
  password: z.string().min(1, "Please Enter Your Password"),
});

type IFormType = z.infer<typeof signUpSchema>;

export default function RegisterView() {
  const router = useRouter();
  const [error, setError] = useState<string>();
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
  } = useForm({ resolver: zodResolver(signUpSchema) });

  const submitForm = async (data: IFormType) => {
    try {
      const res = await registerUser(data.name, data.email, data.password);

      if (res.success && res.data) {
        router.push("/profile");
      } else {
        setError(res.message || "Register failed");
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : "Server Error!");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitForm)} className="grid gap-y-5">
      <CustomInput
        register={register("name")}
        icon={<AtSign />}
        name="Name"
        error={errors?.name?.message}
      />
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

      <ChangeLoginRegister to="login" />
      {error && <p className="text-my-red-med">{error}</p>}

      <FormButton type="submit" isLoading={isSubmitting}>
        Sign Up
      </FormButton>
    </form>
  );
}
