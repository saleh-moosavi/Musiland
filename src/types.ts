import { ISong } from "./services/song";

export type deleteTypes =
  | "song"
  | "genre"
  | "playlist"
  | "user"
  | "album"
  | "singer"
  | null;

export interface ILikeResponse {
  success: boolean;
  data: ISong[];
  message: string;
}

export interface IToggleLikeResponse {
  success: boolean;
  data: number;
  message: string;
}
