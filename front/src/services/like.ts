export const likeToggler = async (userId: string, songId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/likes`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      userId,
      songId,
    }),
  });
  const data = res.json();
  return data;
};
