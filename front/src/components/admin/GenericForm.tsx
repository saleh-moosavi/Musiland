"use client";

import Button from "../shared/Button";
import { UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import useToastStore from "@/store/toastStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { iconClasses } from "@/constants/styleClasses";
import CustomInput from "@/components/auth/CustomInput";
import { useRouter, useSearchParams } from "next/navigation";
import { FormSchemaKey, formSchemas } from "@/constants/zodSchema";

interface GenericFormProps {
  mode: "add" | "edit";
  schemaKey: FormSchemaKey;
  baseUrl: string;
  redirectPath: string;
  itemName: string;
  idParamKey: string;
  nameParamKey: string;
  onSuccess?: () => void;
}

export default function GenericForm({
  mode,
  schemaKey,
  baseUrl,
  redirectPath,
  itemName,
  idParamKey,
  nameParamKey,
  onSuccess,
}: GenericFormProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get(idParamKey);
  const itemNameFromUrl = searchParams.get(nameParamKey);
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
    if (mode === "edit" && itemNameFromUrl) {
      reset({ name: itemNameFromUrl });
    }
  }, [mode, itemNameFromUrl, reset]);

  const onSubmit = async (data: { name: string }) => {
    setError(null);

    const url =
      mode === "add"
        ? `${process.env.NEXT_PUBLIC_API_URL}${baseUrl}`
        : `${process.env.NEXT_PUBLIC_API_URL}${baseUrl}/${itemId}`;

    const method = mode === "add" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();

      if (res.ok) {
        reset();
        setIsToastOpen(true);
        setToastTitle(
          `${itemName} ${mode === "add" ? "added" : "updated"} successfully!`
        );
        setToastColor(mode === "add" ? "green" : "orange");
        onSuccess?.();
        router.push(redirectPath);
      } else {
        setError(result.error || "Operation failed.");
      }
    } catch (err) {
      setError("Server connection error.");
    }
  };

  return (
    <article className="max-w-md min-w-md mx-auto overflow-hidden p-5 rounded-3xl bg-slate-100 dark:bg-slate-800 mt-10 shadow dark:shadow-white/30 text-black dark:text-white">
      <form onSubmit={handleSubmit(onSubmit)} className="grid gap-y-10">
        <h3 className="text-center">
          {mode === "add" ? "Add" : "Edit"} {itemName}
        </h3>

        <CustomInput
          register={register("name")}
          icon={<UserIcon className={iconClasses} />}
          name={`Enter Name of ${itemName}`}
          error={
            typeof errors.name?.message === "string"
              ? errors.name.message
              : undefined
          }
        />

        <div className="space-y-2">
          <Button
            type="submit"
            text={itemName}
            isSubmitting={isSubmitting}
            mode={mode}
          />
          {error && <p className="text-red-500 text-sm text-center">{error}</p>}
        </div>
      </form>
    </article>
  );
}
