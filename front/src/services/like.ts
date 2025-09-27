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

export const getUserLikes = async (userId: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/likes`, {
    method: "POST",
    body: JSON.stringify({ userId }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data;
};
