import { getUser } from "@/services/user";
import { useEffect, useState } from "react";
import { UserFormData } from "@/types/user";

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
      getUser(userId)
        .then((data) => {
          if (data.error) setError(data.error);
          else setUser(data);
        })
        .catch(() => setError("Failed to load user"));
    }
  }, [mode, userId]);

  return { user, error };
}
