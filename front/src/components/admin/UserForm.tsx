"use client";

import { useEffect } from "react";
import { Mode } from "@/app/types/song";
import { useSearchParams } from "next/navigation";
import { Resolver, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CustomInput from "@/components/auth/CustomInput";
import CustomOption from "@/components/auth/CustomOption";
import { useUserFormData } from "@/hooks/useUserFormData";
import { userSchema, UserFormData } from "@/app/types/user";
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
    <article className="p-6 rounded-3xl bg-slate-100 dark:bg-slate-800 mt-10 shadow dark:shadow-white/30 text-black dark:text-white space-y-6">
      <h3 className="text-center text-2xl font-semibold">
        {mode === "add" ? "Add New User" : "Edit User"}
      </h3>

      <form
        onSubmit={handleSubmit(submit)}
        className="grid grid-cols-2 justify-items-center gap-6"
      >
        <CustomInput
          classes="col-span-1"
          register={register("name")}
          icon={<User />}
          name="Full Name"
          error={errors.name?.message}
        />
        <CustomInput
          classes="col-span-1"
          register={register("email")}
          icon={<MailIcon />}
          name="Email"
          error={errors.email?.message}
        />
        <CustomInput
          classes="col-span-1"
          register={register("password")}
          icon={<EyeClosed />}
          name="Password"
          error={errors.password?.message}
        />

        <CustomOption
          classes="col-span-1"
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

        {(fetchError || submitError) && (
          <p className="text-red-500 text-sm text-center col-span-2">
            {fetchError || submitError}
          </p>
        )}

        <button
          disabled={isSubmitting}
          className="bg-gradient-to-r col-span-2 from-cyan-700 to-emerald-400 text-white px-4 py-2 w-full font-bold rounded-md hover:opacity-80 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed"
          type="submit"
        >
          {isSubmitting
            ? "Saving..."
            : mode === "add"
            ? "Create User"
            : "Update User"}
        </button>
      </form>
    </article>
  );
}
