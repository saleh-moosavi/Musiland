import { IUser } from "@/models/user";
import { getUser } from "@/services/user";
import { useEffect, useState } from "react";

export function useUserFormData({
  mode,
  userId,
}: {
  mode: string;
  userId: string | null;
}) {
  const [user, setUser] = useState<IUser | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (mode === "edit" && userId) {
      getUser(userId)
        .then((data) => {
          if (data.success) setUser(data?.data ?? null);
          else setError(data?.message || "");
        })
        .catch(() => setError("Failed to load user"));
    }
  }, [mode, userId]);

  return { user, error };
}
