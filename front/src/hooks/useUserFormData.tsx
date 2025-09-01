import { useEffect, useState } from "react";
import { UserFormData } from "@/app/types/user";

export function useUserFormData({
  mode,
  userId,
}: {
  mode: string;
  userId: string | null;
}) {
  const [user, setUser] = useState<UserFormData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && userId) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.error) setError(data.error);
          else setUser(data);
        })
        .catch(() => setError("Failed to load user"));
    }
  }, [mode, userId]);

  return { user, error };
}
