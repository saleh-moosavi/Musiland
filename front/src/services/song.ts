import { GetSong } from "@/types/song";

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
