"use client";

import z from "zod";
import Link from "next/link";
import Button from "../shared/Button";
import { useForm } from "react-hook-form";
import { useEffect, useRef } from "react";
import useUserStore from "@/store/userStore";
import useSongStore from "@/store/songStore";
import useToastStore from "@/store/toastStore";
import { zodResolver } from "@hookform/resolvers/zod";

export default function AddComment({ id: songId }: { id: string }) {
  const { isLoggedIn } = useUserStore();
  const userIdRef = useRef<null | string>(null);
  const { setIsToastOpen, setToastColor, setToastTitle } = useToastStore();
  const { comments, setComments } = useSongStore();
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
    fetch("/api/getUserData")
      .then(async (res) => await res.json())
      .then((data) => {
        if (data.ok === true) {
          userIdRef.current = data?.user?.id;
        } else {
          setIsToastOpen(true);
          setToastColor("orange");
          setToastTitle(data.error || "Error");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  const submitComment = async (data: { comment: string }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        description: data.comment,
        user: userIdRef.current,
        song: songId,
      }),
      credentials: "include",
    });
    const resData = await res.json();
    console.log(resData);
    setValue("comment", "");
    if (resData.ok) {
      setComments([...comments, resData.comment]);
    }
  };
  if (isLoggedIn && userIdRef.current) {
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
