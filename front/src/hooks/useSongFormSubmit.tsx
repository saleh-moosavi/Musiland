import { useState } from "react";
import { useRouter } from "next/navigation";
import { SongFormData } from "@/types/song";
import { addEditSong } from "@/services/song";
import useToastStore from "@/store/toastStore";

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
  const { setIsToastOpen, setToastTitle, setToastColor } = useToastStore();

  const submit = async (data: SongFormData) => {
    setError(null);
    setIsSubmitting(true);
    try {
      const result: any = await addEditSong(mode, songId, data);

      if (result.ok) {
        setIsToastOpen(true);
        setToastTitle(
          `Song ${mode === "add" ? "added" : "updated"} successfully!`
        );
        setToastColor(mode === "add" ? "green" : "orange");
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
