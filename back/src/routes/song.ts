import { Router } from "express";
import {
  getAllSong,
  getByIdSong,
  createSong,
  updateSong,
  deleteSong,
} from "@controllers/song.js";

const songRouter = Router();

songRouter.route("/").get(getAllSong).post(createSong);
songRouter.route("/:id").get(getByIdSong).put(updateSong).delete(deleteSong);

export { songRouter };
