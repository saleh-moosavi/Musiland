"use client";
import { Trash } from "lucide-react";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import useToastStore from "@/store/toastStore";
import TimeAgo from "@/components/music-name/TimeAgo";
import { CommentByUserId, getCommentByUserId } from "@/types/comment";

export default function page() {
  const { userId } = useUserStore();
  const [comments, setComments] = useState<CommentByUserId[] | null>(null);
  const { setIsToastOpen, setToastColor, setToastTitle } = useToastStore();

  const getComments = async (): Promise<CommentByUserId[]> => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/user/${userId}`
    );
    if (!res.ok) throw new Error("Failed to fetch comments");
    const data: getCommentByUserId = await res.json();
    return data.data;
  };

  useEffect(() => {
    getComments().then((data) => {
      setComments(data);
    });
  }, [userId]);

  const handleDelete = async (id: string) => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`,
      {
        method: "DELETE",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      }
    );
    const data = await res.json();
    if (data.ok === true) {
      setIsToastOpen(true);
      setToastColor("green");
      setToastTitle(data.message || "Comment Deleted Successfully");
      const newComments = comments?.filter((item) => item._id !== id) || null;
      setComments(newComments);
    } else {
      setIsToastOpen(true);
      setToastColor("red");
      setToastTitle(data.error || "Error Deleting Comment");
    }
  };

  return (
    <ul className="grid md:grid-cols-2 gap-2">
      {comments?.map((comment) => {
        return (
          <li
            key={comment._id}
            className="flex justify-between items-start p-3 rounded-xl bg-my-white-low dark:bg-my-black-max shadow-md shadow-my-black-low/20"
          >
            <article className="space-y-3">
              <div className="flex items-center gap-3 text-xs border-b w-fit pb-2 border-my-black-low text-start">
                <TimeAgo date={comment.createdAt} />
                <p>
                  <span className="text-my-black-med dark:text-my-black-low">
                    Commented For :{" "}
                  </span>
                  {comment.song.name}
                </p>
              </div>
              <p>{comment.description}</p>
            </article>
            <button
              onClick={() => handleDelete(comment._id)}
              className="text-my-red-med cursor-pointer size-5"
            >
              <Trash />
            </button>
          </li>
        );
      })}
    </ul>
  );
}
