"use client";

import Button from "../shared/Button";
import useUserStore from "@/store/userStore";

export default function AddComment({ id: songId }: { id: string }) {
  const { isLoggedIn } = useUserStore();
  const submitComment = (e: any) => {
    e.preventDefault();
    console.log(songId);
  };
  if (isLoggedIn) {
    return (
      <section className="w-full p-3 flex flex-col items-center gap-2 text-my-black-max dark:text-my-white-low dark:bg-my-black-max bg-my-white-low rounded-xl">
        <h2>Add New Comment</h2>
        <form className="space-y-2" onSubmit={submitComment}>
          <textarea
            className="py-3 px-5 min-w-lg bg-my-white-med dark:bg-my-black-high outline-0 border-none rounded-xl text-my-green-high caret-my-green-high placeholder:text-my-black-med focus:outline-1 focus:outline-my-green-med"
            cols={5}
            placeholder="Enter Your Comment"
          ></textarea>
          <div className="min-w-lg">
            <Button type="submit" text="Comment" mode="add" />
          </div>
        </form>
      </section>
    );
  } else {
    return <p>Please Login To Send Your Comment</p>;
  }
}
