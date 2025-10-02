import { generalItems } from "@/types/generalItems";

export const getSingers = async (): Promise<generalItems[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/singers`);
  const data = await res.json();
  return data;
};
