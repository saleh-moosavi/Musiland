"use client";

import TimeAgo from "./TimeAgo";
import { IComment } from "@/models/comment";
import useSongStore from "@/store/songStore";
import { useEffect, useRef, useState } from "react";

export default function Comments({
  comments,
  commentCount,
}: {
  comments: IComment[];
  commentCount: number;
}) {
  const [showCount, setShowCount] = useState(5);
  const commentsLength = useRef(commentCount || 0);
  const { comments: commentsState, setComments } = useSongStore();

  useEffect(() => {
    setComments(comments);
  }, []);

  const showMoreComments = () => {
    setShowCount((prev) => prev + 10);
  };
  const showLessComments = () => {
    setShowCount(5);
  };
  return (
    <section className="my-10 space-y-5 dark:text-my-white-low text-my-black-max">
      <h3 className="text-xl font-semibold">Comments ({commentCount})</h3>
      {commentsLength.current > 0 ? (
        <ul className="space-y-2">
          {commentsState?.map((comment, index) => {
            if (index < showCount) {
              return (
                <li
                  key={comment._id}
                  className="p-3 rounded-xl bg-my-white-low dark:bg-my-black-max space-y-3 shadow-md shadow-my-black-low/20"
                >
                  <p className="flex items-center gap-3 text-sm border-b w-fit pb-2 border-my-black-low">
                    <span>{comment.user.name}</span>
                    <TimeAgo date={comment.createdAt} />
                  </p>
                  <p>{comment.description}</p>
                </li>
              );
            }
          })}
        </ul>
      ) : (
        <p className="text-sm">Be The First One Who Leave a Comment</p>
      )}
      {commentsLength.current > 5 && (
        <div className="flex justify-center *:w-fit">
          <button
            onClick={
              commentsLength.current > showCount
                ? showMoreComments
                : showLessComments
            }
            className="w-full px-4 py-2 bg-gradient-to-r from-my-blue-high to-my-green-med text-my-white-low font-bold rounded-md hover:opacity-80 disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed transition-all duration-300"
          >
            {commentsLength.current > showCount ? "Show More" : "Minimize"}
          </button>
        </div>
      )}
    </section>
  );
}
