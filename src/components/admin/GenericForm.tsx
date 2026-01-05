"use client";

import Button from "../shared/Button";
import { UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import useToastStore from "@/store/toastStore";
import { formSchemas } from "@/constants/zodSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { iconClasses } from "@/constants/styleClasses";
import CustomInput from "@/components/auth/CustomInput";
import { useRouter, useSearchParams } from "next/navigation";
import { GenericAddFormProps, GenericEditFormProps } from "@/types/inputTypes";

export default function GenericForm({
  mode,
  title,
  submitFn,
  schemaKey,
  redirectPath,
}: GenericAddFormProps | GenericEditFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("itemId") || "";
  const itemName = searchParams.get("itemName") || undefined;
  const { setIsToastOpen, setToastTitle, setToastColor } = useToastStore();

  const [error, setError] = useState<string | null>(null);

  const schema = formSchemas[schemaKey];

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (mode === "edit") {
      reset({ name: itemName });
    }
  }, [mode, reset, itemName]);

  const onSubmit = async (data: { name: string }) => {
    setError(null);

    try {
      const result = await (mode === "add"
        ? submitFn(data.name)
        : submitFn(data.name, itemId));

      if (result.success) {
        reset();
        setIsToastOpen(true);
        setToastTitle(
          `${title} ${mode === "add" ? "added" : "updated"} successfully!`
        );
        setToastColor(mode === "add" ? "green" : "orange");
        router.push("/admin/dashboard" + redirectPath);
      } else {
        setError(result.message || "Operation failed.");
      }
    } catch (error: unknown) {
      setError(
        error instanceof Error ? error.message : "Server connection error"
      );
    }
  };

  return (
    <article className="max-w-md w-full mx-auto overflow-hidden p-5 rounded-3xl bg-my-white-low dark:bg-my-black-max mt-10 shadow dark:shadow-my-black-low/30 text-my-black-max dark:text-my-white-low">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-10">
        <h3 className="text-center">
          {mode === "add" ? "Add" : "Edit"} {title}
        </h3>

        <CustomInput
          register={register("name")}
          icon={<UserIcon className={iconClasses} />}
          name={`Enter Name of ${title}`}
          error={
            typeof errors.name?.message === "string"
              ? errors.name.message
              : undefined
          }
        />

        <div className="space-y-2">
          <Button
            type="submit"
            text={title}
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
