import { Router } from "express";
import {
  getAllAlbum,
  getByIdAlbum,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from "@controllers/album.js";

const albumRouter = Router();

albumRouter.route("/").get(getAllAlbum).post(createAlbum);
albumRouter
  .route("/:id")
  .get(getByIdAlbum)
  .put(updateAlbum)
  .delete(deleteAlbum);

export { albumRouter };
