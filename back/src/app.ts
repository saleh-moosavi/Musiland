import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { songRouter } from "@routes/song.js";
import { authRouter } from "@routes/auth.js";
import { userRouter } from "./routes/user.js";
import { connectToDB } from "./configs/db.js";
import { genreRouter } from "@routes/genre.js";
import { albumRouter } from "@routes/album.js";
import { singerRouter } from "@routes/singer.js";
import { authMiddleware } from "middlewares/auth.js";
import { userMiddleware } from "middlewares/user.js";
import { playlistRouter } from "@routes/playlist.js";
import type { Express, Request, Response } from "express";

const app: Express = express();

const corsOptions = {
  origin: "http://localhost:3000", // Front Url
  credentials: true, // For Cookies
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

dotenv.config();
app.use(express.json());
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));

connectToDB(app);

// Routes And Middlewares
app.use("/api/users", userMiddleware, userRouter);
app.use("/api/auth", authMiddleware, authRouter);

app.use("/api/songs", songRouter);
app.use("/api/albums", albumRouter);
app.use("/api/genres", genreRouter);
app.use("/api/singers", singerRouter);
app.use("/api/playlists", playlistRouter);

// 404 Route
app.use((req: Request, res: Response) => {
  res.status(404).send("404, Page Not Found");
});
