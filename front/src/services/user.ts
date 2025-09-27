export const addEditUser = async (
  mode: "add" | "edit",
  userId: string | null,
  data: {
    name: string;
    password: string;
    email: string;
    role: string;
  }
) => {
  const url =
    mode === "add"
      ? `${process.env.NEXT_PUBLIC_API_URL}/users`
      : `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`;
  const method = mode === "add" ? "POST" : "PUT";
  const res = await fetch(url, {
    method: method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  return result;
};

export const getUsers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`);
  const data = await res.json();
  return data;
};
