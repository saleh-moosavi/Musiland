import { z } from "zod";

export const addSongSchema = z.object({
  name: z.string().min(1, "Song name is required"),
  lyric: z.string().optional(),
  audioUrl: z.string().url("Url Must Fill Currectly"),
  coverUrl: z.string().url("Url Must Fill Currectly"),
  singerId: z.string().min(1, "Select Singer"),
  albumId: z.string().min(1, "Select Album"),
  genreIds: z.array(z.string()).min(1, "Select Genre"),
  playlistIds: z.array(z.string()).min(1, "Select Playlist"),
});

export type SongFormData = z.infer<typeof addSongSchema>;

export type Mode = "add" | "edit";
