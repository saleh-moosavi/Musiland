import { useState } from "react";
import { useRouter } from "next/navigation";
import { SongFormData } from "@/app/types/song";

interface UseSongFormSubmitProps {
  mode: "add" | "edit";
  songId: string | null;
}

interface UseSongFormSubmitResult {
  submit: (data: SongFormData) => Promise<void>;
  error: string | null;
  isSubmitting: boolean;
}

export function useSongFormSubmit({
  mode,
  songId,
}: UseSongFormSubmitProps): UseSongFormSubmitResult {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = async (data: SongFormData) => {
    setError(null);
    setIsSubmitting(true);

    const url =
      mode === "add"
        ? `${process.env.NEXT_PUBLIC_API_URL}/songs`
        : `${process.env.NEXT_PUBLIC_API_URL}/songs/${songId}`;
    const method = mode === "add" ? "POST" : "PUT";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      const result = await res.json();
      if (res.ok) {
        alert(`Song ${mode === "add" ? "added" : "updated"} successfully!`);
        router.push("/admin/dashboard/song");
      } else {
        setError(result.error?.message || "Operation failed.");
      }
    } catch (err) {
      setError("Server connection error.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, error, isSubmitting };
}
