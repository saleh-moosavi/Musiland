"use client";
import { Trash } from "lucide-react";
import useToast from "@/hooks/useToast";
import { useEffect, useState } from "react";
import useUserStore from "@/store/userStore";
import { IComment } from "@/models/comment";
import TimeAgo from "@/components/music-name/TimeAgo";
import { deleteComment, getUserComments } from "@/services/comment";

export default function Page() {
  const { userData } = useUserStore();
  const [comments, setComments] = useState<IComment[] | null>(null);
  const { showToast } = useToast();

  useEffect(() => {
    getUserComments(userData?.id)
      .then((data) => {
        setComments(data.data);
      })
      .catch((err) => console.log(err));
  }, [userData]);

  const handleDelete = async (id: string) => {
    const data = await deleteComment(id);
    if (data.success === true) {
      showToast(data.message || "Comment Deleted Successfully", "green");
      const newComments = comments?.filter((item) => item._id !== id) || null;
      setComments(newComments);
    } else {
      showToast(data.message || "Error Deleting Comment", "red");
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
