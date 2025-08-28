import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { userRouter } from "./routes/user.js";
import { connectToDB } from "./configs/db.js";
import { userMiddleware } from "middlewares/user.js";
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

// 404 Route
app.use((req: Request, res: Response) => {
  res.status(404).send("404, Page Not Found");
});
