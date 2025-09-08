"use client";

import { useEffect } from "react";
import { Mode } from "@/types/song";
import Button from "../shared/Button";
import { useSearchParams } from "next/navigation";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userSchema, UserFormData } from "@/types/user";
import CustomInput from "@/components/auth/CustomInput";
import CustomOption from "@/components/auth/CustomOption";
import { useUserFormData } from "@/hooks/useUserFormData";
import { useUserFormSubmit } from "@/hooks/useUserFormSubmit";
import { User, Shield, MailIcon, EyeClosed } from "lucide-react";

export default function UserForm({ mode }: { mode: Mode }) {
  const searchParams = useSearchParams();
  const userId = searchParams.get("userId");

  const { user, error: fetchError } = useUserFormData({ mode, userId });
  const {
    submit,
    error: submitError,
    isSubmitting,
  } = useUserFormSubmit({
    mode,
    userId,
  });

  const {
    formState: { errors },
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
      setValue("password", user.password);
      setValue("email", user.email);
    }
  }, [user, mode, setValue]);

  return (
    <article className="p-6 rounded-3xl bg-my-white-low dark:bg-my-black-max mt-10 shadow-md dark:shadow-my-black-low/30 text-my-black-max dark:text-my-white-low space-y-6">
      <h3 className="text-center text-2xl font-semibold">
        {mode === "add" ? "Add New User" : "Edit User"}
      </h3>

      <form onSubmit={handleSubmit(submit)} className="space-y-5">
        <article className="grid grid-cols-2 *:col-span-1 justify-items-center gap-5">
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
          {(fetchError || submitError) && (
            <p className="text-my-red-med text-sm text-center">
              {fetchError || submitError}
            </p>
          )}
        </div>
      </form>
    </article>
  );
}
