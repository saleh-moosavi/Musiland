"use client";

import z from "zod";
import FormButton from "../../../components/FormButton";
import useToast from "@/hooks/useToast";
import { UserIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { IGenreResponse } from "@/models/genre";
import { IAlbumResponse } from "@/models/album";
import { ISingerResponse } from "@/models/singer";
import CustomInput from "@/components/CustomInput";
import { IPlaylistResponse } from "@/models/playlist";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";

const Schema = z.object({
  name: z.string().min(1, "Please Enter Singer Name"),
});

type IResponse =
  | ISingerResponse
  | IGenreResponse
  | IAlbumResponse
  | IPlaylistResponse;

interface IPropsBase {
  title: string;
  redirectPath: string;
}

interface IPropsAdd extends IPropsBase {
  mode: "add";
  submitFn: (name: string) => Promise<IResponse>;
}

interface IPropsEdit extends IPropsBase {
  mode: "edit";
  submitFn: (name: string, id: string) => Promise<IResponse>;
}

export default function GenericForm({
  mode,
  title,
  submitFn,
  redirectPath,
}: IPropsAdd | IPropsEdit) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const itemId = searchParams.get("itemId") || "";
  const itemName = searchParams.get("itemName") || undefined;
  const { showToast } = useToast();

  const [error, setError] = useState<string | null>(null);

  const {
    formState: { errors, isSubmitting },
    register,
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(Schema),
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
        showToast(
          `${title} ${mode === "add" ? "added" : "updated"} successfully!`,
          mode === "add" ? "green" : "orange"
        );
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
          icon={<UserIcon />}
          name={`Enter Name of ${title}`}
          error={errors?.name?.message}
        />

        <div className="space-y-2">
          <FormButton type="submit" isLoading={isSubmitting}>
            {mode == "add" ? "Add" : "Edit"} New {title}
          </FormButton>

          {error && (
            <p className="text-my-red-med text-sm text-center">{error}</p>
          )}
        </div>
      </form>
    </article>
  );
}
