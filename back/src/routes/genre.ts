import { Router } from "express";
import {
  getAllGenre,
  getByIdGenre,
  createGenre,
  updateGenre,
  deleteGenre,
} from "@controllers/genre.js";

const genreRouter = Router();

genreRouter.route("/").get(getAllGenre).post(createGenre);
genreRouter
  .route("/:id")
  .get(getByIdGenre)
  .put(updateGenre)
  .delete(deleteGenre);

export { genreRouter };
