import { useState } from "react";
import { useRouter } from "next/navigation";
import { addEditUser } from "@/services/user";
import useToastStore from "@/store/toastStore";

export function useUserFormSubmit({
  mode,
  userId,
}: {
  mode: "add" | "edit";
  userId: string | null;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsToastOpen, setToastColor, setToastTitle } = useToastStore();

  const submit = async (data: {
    name: string;
    password: string;
    email: string;
    role: string;
  }) => {
    setIsSubmitting(true);
    setError(null);

    try {
      const result = await addEditUser(mode, userId, data);
      if (!result.data) throw new Error(result.error || "Something went wrong");
      setIsToastOpen(true);
      setToastColor("green");
      setToastTitle(
        `User ${mode === "add" ? "Added" : "Updated"} Successfully`
      );
      router.push("/admin/dashboard/user");
    } catch (err) {
      setError(err as string);
      setIsToastOpen(true);
      setToastColor("red");
      setToastTitle(`SomeThing Went Wrong!`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, error, isSubmitting };
}
