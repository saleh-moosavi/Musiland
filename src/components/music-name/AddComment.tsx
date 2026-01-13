"use client";

import z from "zod";
import Link from "next/link";
import Button from "../shared/Button";
import useAuth from "@/hooks/useAuth";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import useUserStore from "@/store/userStore";
import useMusicStore from "@/store/musicStore";
import useToastStore from "@/store/toastStore";
import { addComment } from "@/services/comment";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddComment({ id: songId }: { id: string }) {
  const { error } = useAuth();
  const { userData } = useUserStore();
  const userIdRef = useRef<null | string>(null);
  const { comments, setComments } = useMusicStore();
  const { setIsToastOpen, setToastColor, setToastTitle } = useToastStore();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(
      z.object({
        comment: z.string().min(1, "comment is required"),
      })
    ),
  });

  //get user id and user liked list
  useEffect(() => {
    if (userData) {
      userIdRef.current = userData.id;
    } else {
      setIsToastOpen(true);
      setToastColor("orange");
      setToastTitle(error || "Authentication required");
    }
  }, [userData, error]);

  //handle Send Comment
  const submitComment = async (data: { comment: string }) => {
    setValue("comment", "");
    const res = await addComment(data.comment, userData?.id ?? "", songId);
    if (res.success) {
      setComments([res.data, ...comments]);
    } else {
      setIsToastOpen(true);
      setToastColor("red");
      setToastTitle("Error Adding Comment");
    }
  };

  if (userData && userIdRef.current) {
    return (
      <section className="w-full p-3 flex flex-col items-center gap-2 text-my-black-max dark:text-my-white-low dark:bg-my-black-max bg-my-white-low rounded-xl">
        <h2>Add New Comment</h2>
        <form className="space-y-5" onSubmit={handleSubmit(submitComment)}>
          <article>
            <textarea
              {...register("comment")}
              className="py-3 px-5 min-w-lg bg-my-white-med dark:bg-my-black-high outline-0 border-none rounded-xl text-my-green-high caret-my-green-high placeholder:text-my-black-med focus:outline-1 focus:outline-my-green-med"
              cols={5}
              placeholder="Enter Your Comment"
            ></textarea>
            {errors?.comment?.message &&
              typeof errors?.comment?.message === "string" && (
                <p className="text-sm text-my-red-med">
                  {errors.comment.message}
                </p>
              )}
          </article>
          <div className="min-w-lg">
            <Button
              mode="add"
              type="submit"
              text="Comment"
              isSubmitting={isSubmitting}
            />
          </div>
        </form>
      </section>
    );
  } else {
    return (
      <Link
        href="/login"
        className="block p-2 text-center text-my-black-max dark:text-my-white-low border border-my-blue-med rounded-xl animate-pulse cursor-pointer"
      >
        Please Login To Send Your Comment
      </Link>
    );
  }
}
