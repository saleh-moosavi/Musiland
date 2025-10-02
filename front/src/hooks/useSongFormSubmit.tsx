import { useState } from "react";
import { useRouter } from "next/navigation";
import { addEditSong } from "@/services/song";
import useToastStore from "@/store/toastStore";
import {
  SongFormData,
  UseSongFormProps,
  UseSongFormSubmitResult,
} from "@/types/song";

export function useSongFormSubmit({
  mode,
  songId,
}: UseSongFormProps): UseSongFormSubmitResult {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsToastOpen, setToastTitle, setToastColor } = useToastStore();

  const submit = async (data: SongFormData) => {
    setError(null);
    setIsSubmitting(true);
    try {
      const result = await addEditSong(mode, songId, data);

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
