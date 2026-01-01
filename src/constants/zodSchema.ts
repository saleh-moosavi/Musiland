import z from "zod";

export const signUpSchema = z.object({
  username: z.string().min(1, "Please Enter Your Name"),
  email: z.string().email("Please Enter Your Email"),
  password: z.string().min(1, "Please Enter Your Password"),
});

export const signInSchema = z.object({
  email: z.string().email("Please Enter Your email"),
  password: z.string().min(1, "Please Enter Your Password"),
});

export const singerSchema = z.object({
  name: z.string().min(1, "Please Enter Singer Name"),
});

export const genreSchema = z.object({
  name: z.string().min(1, "Please Enter Genre Name"),
});

export const playlistSchema = z.object({
  name: z.string().min(1, "Please Enter Playlist Name"),
});

export const albumSchema = z.object({
  name: z.string().min(1, "Please Enter Album Name"),
});

export const songSchema = z.object({
  name: z.string().min(1, "Song name is required"),
  lyric: z.string().optional(),
  audioUrl: z.string().url().url(),
  coverUrl: z.string().url().url(),
  singerId: z.string(),
  albumId: z.string(),
  genreIds: z.array(z.string()),
  playlistIds: z.array(z.string()),
});

export const formSchemas = {
  singer: singerSchema,
  album: albumSchema,
  genre: genreSchema,
  playlist: playlistSchema,
};

export type FormSchemaKey = keyof typeof formSchemas;
