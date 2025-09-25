export const registerUser = async (
  username: string,
  email: string,
  password: string
) => {
  const res = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email, password }),
    credentials: "include",
  });

  const result = await res.json();

  return result;
};

export const loginUser = async (email: string, password: string) => {
  const res = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email,
      password,
    }),
    credentials: "include",
  });

  const result = await res.json();

  return result;
};
