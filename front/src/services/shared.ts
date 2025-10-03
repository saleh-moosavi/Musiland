import apiClient from "@/configs/axios";
import { deleteTypes } from "@/types/shared";

export const addEditGenerics = async (
  mode: "add" | "edit",
  baseUrl: string,
  itemId: string | null,
  data: { name: string }
) => {
  const url = mode === "add" ? baseUrl : `${baseUrl}/${itemId}`;
  const method = mode === "add" ? "post" : "put";

  return apiClient[method](url, data).then((res) => res.data);
};

export const popUpDelete = (type: deleteTypes, id: string) =>
  apiClient.delete(`/${type}s/${id}`).then((res) => res.data);
