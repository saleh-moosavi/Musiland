"use client";

import z from "zod";
import { IUser } from "@/services/user";
import { IMode } from "@/services/song";
import useToast from "@/hooks/useToast";
import { useEffect, useState } from "react";
import FormButton from "@/components/FormButton";
import CustomInput from "@/components/CustomInput";
import { Resolver, useForm } from "react-hook-form";
import CustomOption from "@/components/CustomOption";
import { zodResolver } from "@hookform/resolvers/zod";
import { addUser, editUser, getUser } from "@/services/user";
import { useRouter, useSearchParams } from "next/navigation";
import { User, Shield, MailIcon, EyeClosed } from "lucide-react";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "More Than 6 Character"),
  role: z.enum(["user", "admin", "manager"] as const).catch("user"),

  likedSongs: z.array(z.string()).min(0).default([]),
  comments: z.array(z.string()).min(0).default([]),
});

export type UserFormData = z.infer<typeof userSchema>;

export default function UserForm({ mode }: { mode: IMode }) {
  const router = useRouter();
  const { showToast } = useToast();
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Get User Data In Edit Mode
  useEffect(() => {
    if (mode === "edit" && userId) {
      getUser(userId)
        .then((data) => {
          if (data.success) setUser(data?.data ?? null);
          else setError(data?.message || "");
        })
        .catch(() => setError("Failed to load user"));
    }
  }, [mode, userId]);

  // Form Hook & Initialize
  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    setValue,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema) as Resolver<UserFormData>,
  });

  useEffect(() => {
    if (mode === "edit" && user) {
      setValue("name", user.name);
      setValue("role", user.role);
      setValue("email", user.email);
    }
  }, [user, mode]);

  // Submit Handler
  const submit = async (data: UserFormData) => {
    setError(null);

    try {
      const result = await (mode === "add"
        ? addUser(data)
        : editUser(userId!, data));
      if (!result.success)
        throw new Error(result.message || "Something went wrong");

      // Successful Toast
      showToast(
        `User ${mode === "add" ? "Added" : "Updated"} Successfully`,
        "green",
      );
      router.push("/admin/dashboard/user");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error");
      showToast(
        error instanceof Error ? error.message : "SomeThing Went Wrong",
        "red",
      );
    }
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="space-y-5">
      <article className="grid md:grid-cols-2 *:col-span-1 justify-items-center gap-5">
        <CustomInput
          register={register("name")}
          icon={<User />}
          name="Full Name"
          error={errors.name?.message}
        />
        <CustomInput
          register={register("email")}
          icon={<MailIcon />}
          name="Email"
          error={errors.email?.message}
        />
        <CustomInput
          register={register("password")}
          icon={<EyeClosed />}
          name="Password"
          error={errors.password?.message}
        />

        <CustomOption
          title="Role"
          icon={<Shield />}
          register={register("role")}
          data={[
            { _id: "user", name: "User" },
            { _id: "manager", name: "Manager" },
            { _id: "admin", name: "Admin" },
          ]}
          error={errors.role?.message}
        />
      </article>
      <div className="space-y-2">
        <FormButton type="submit" isLoading={isSubmitting}>
          {mode == "add" ? "Add" : "Edit"} New User
        </FormButton>
        {error && (
          <p className="text-my-red-med text-sm text-center">{error}</p>
        )}
      </div>
    </form>
  );
}
