import { z } from "zod";
import { generalItems } from "./generalItems";
import { GenericFormData } from "./inputTypes";

export const addSongSchema = z.object({
  name: z.string().min(1, "Song name is required"),
  lyric: z.string().optional(),
  audioUrl: z.string().url("Url Must Fill Currectly"),
  coverUrl: z.string().url("Url Must Fill Currectly"),
  singer: z.string().min(1, "Select Singer"),
  album: z.string().min(1, "Select Album"),
  genre: z.array(z.string()).min(1, "Select Genre"),
  playlist: z.array(z.string()).min(1, "Select Playlist"),
});

export type SongFormData = z.infer<typeof addSongSchema>;

export type Mode = "add" | "edit";

export interface UseSongFormProps {
  mode: Mode;
  songId: string | null;
}

export interface UseSongFormSubmitResult {
  submit: (data: SongFormData) => void;
  error: string | null;
  isSubmitting: boolean;
}

export interface UseSongFormDataResult {
  singer: GenericFormData[];
  album: GenericFormData[];
  genre: GenericFormData[];
  playlist: GenericFormData[];
  song: SongFormData | null;
  error: string | null;
}

export interface ISong {
  _id: string;
  name: string;
  lyric: string;
  audioUrl: string;
  coverUrl: string;
  createdAt: string;
  likes: number;
  comments: string[];
  album: generalItems;
  genre: generalItems[];
  playlist: generalItems[];
  singer: generalItems;
  updatedAt: string;
  __v: number;
}

export interface ISongResponse {
  success: boolean;
  data: ISong;
  message?: string;
  error?: string;
  status?: number;
}

export interface ISongListResponse {
  success: boolean;
  data: ISong[];
  message?: string;
  error?: string;
  status?: number;
}
