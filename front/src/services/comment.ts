import { getComment } from "@/types/comment";

export const getComments = async (id: string): Promise<getComment> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments/${id}`);
  if (!res.ok) throw new Error("Failed to fetch comments");
  return res.json();
};

export const addComment = async (
  data: { comment: string },
  userId: string | null,
  songId: string
) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      description: data.comment,
      user: userId,
      song: songId,
    }),
    credentials: "include",
  });
  const resData = await res.json();
  return resData;
};
