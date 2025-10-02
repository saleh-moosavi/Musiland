import { deleteTypes } from "@/types/shared";

export const addEditGenerics = async (
  mode: "add" | "edit",
  baseUrl: string,
  itemId: string | null,
  data: {
    name: string;
  }
) => {
  const url =
    mode === "add"
      ? `${process.env.NEXT_PUBLIC_API_URL}${baseUrl}`
      : `${process.env.NEXT_PUBLIC_API_URL}${baseUrl}/${itemId}`;

  const method = mode === "add" ? "POST" : "PUT";

  const res = await fetch(url, {
    method,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    credentials: "include",
  });

  const result = await res.json();
  return result;
};

export const popUpDelete = async (type: deleteTypes, id: string) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/${type}s/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
