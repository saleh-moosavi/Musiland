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

export const addSingerSchema = z.object({
  name: z.string().min(1, "Please Enter Singer Name"),
});

export const addGenreSchema = z.object({
  name: z.string().min(1, "Please Enter Genre Name"),
});

export const addPlaylistSchema = z.object({
  name: z.string().min(1, "Please Enter Playlist Name"),
});

export const addAlbumSchema = z.object({
  name: z.string().min(1, "Please Enter Album Name"),
});
