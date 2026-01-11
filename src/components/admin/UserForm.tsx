"use client";

import Button from "../shared/Button";
import { IMode } from "@/models/song";
import { useEffect, useState } from "react";
import useToastStore from "@/store/toastStore";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/auth/CustomInput";
import CustomOption from "@/components/auth/CustomOption";
import { addUser, editUser, getUser } from "@/services/user";
import { useRouter, useSearchParams } from "next/navigation";
import { IUser, UserFormData, userSchema } from "@/models/user";
import { User, Shield, MailIcon, EyeClosed } from "lucide-react";

export default function UserForm({ mode }: { mode: IMode }) {
  const router = useRouter();
  const { setIsToastOpen, setToastColor, setToastTitle } = useToastStore();
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
      setIsToastOpen(true);
      setToastColor("green");
      setToastTitle(
        `User ${mode === "add" ? "Added" : "Updated"} Successfully`
      );
      router.push("/admin/dashboard/user");
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : "Error");
      setIsToastOpen(true);
      setToastColor("red");
      setToastTitle(`SomeThing Went Wrong!`);
    }
  };

  return (
    <article className="p-6 rounded-3xl bg-my-white-low dark:bg-my-black-max mt-10 shadow-md dark:shadow-my-black-low/30 text-my-black-max dark:text-my-white-low space-y-6">
      <h3 className="text-center text-2xl font-semibold">
        {mode === "add" ? "Add New User" : "Edit User"}
      </h3>

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
          <Button
            type="submit"
            text="User"
            isSubmitting={isSubmitting}
            mode={mode}
          />
          {error && (
            <p className="text-my-red-med text-sm text-center">{error}</p>
          )}
        </div>
      </form>
    </article>
  );
}
