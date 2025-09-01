import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6).optional().or(z.literal("")),
  role: z.enum(["user", "admin", "manager"] as const).catch("user"),

  likedSongs: z.array(z.string()).min(0).default([]),
  comments: z.array(z.string()).min(0).default([]),
});

export type UserFormData = z.infer<typeof userSchema>;
