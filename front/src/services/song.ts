import { GetSong, SongFormData } from "@/types/song";

export const getSong = async (id: string): Promise<GetSong> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/songs/${id}`);
  const data = await res.json();
  return data.song;
};

export const getAllSongs = async (query: string): Promise<GetSong[]> => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/songs?${query}`);
  const data = await res.json();
  return data.songs;
};

export const addEditSong = async (
  mode: "add" | "edit",
  songId: string | null,
  data: SongFormData
) => {
  const url =
    mode === "add"
      ? `${process.env.NEXT_PUBLIC_API_URL}/songs`
      : `${process.env.NEXT_PUBLIC_API_URL}/songs/${songId}`;
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
