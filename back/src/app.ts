import dotenv from "dotenv";
import type { Express } from "express";
import express, { json } from "express";
import { userRouter } from "./routes/user.js";
import { connectToDB } from "./configs/db.js";
import { userMiddleware } from "middlewares/user.js";

dotenv.config();

const app: Express = express();
app.use(json());

connectToDB(app);

app.use(userMiddleware);
app.use("/users", userRouter);

// 404 Route
app.use((req, res) => {
  res.status(404).send("404, Page Not Found");
});
