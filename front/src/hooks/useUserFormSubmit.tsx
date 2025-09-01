import useToastStore from "@/store/toastStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function useUserFormSubmit({
  mode,
  userId,
}: {
  mode: string;
  userId: string | null;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setIsToastOpen, setToastColor, setToastTitle } = useToastStore();

  const submit = async (data: any) => {
    setIsSubmitting(true);
    setError(null);

    try {
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
      if (!res.ok) throw new Error(result.error || "Something went wrong");
      setIsToastOpen(true);
      setToastColor("green");
      setToastTitle(
        `User ${mode === "add" ? "Added" : "Updated"} Successfully`
      );
      router.push("/admin/dashboard/user");
    } catch (err: any) {
      setError(err.message);
      setIsToastOpen(true);
      setToastColor("red");
      setToastTitle(`SomeThing Went Wrong!`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return { submit, error, isSubmitting };
}
