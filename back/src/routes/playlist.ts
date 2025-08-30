import { Router } from "express";
import {
  getAllPlaylist,
  getByIdPlaylist,
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
} from "@controllers/playlist.js";

const playlistRouter = Router();

playlistRouter.route("/").get(getAllPlaylist).post(createPlaylist);
playlistRouter
  .route("/:id")
  .get(getByIdPlaylist)
  .put(updatePlaylist)
  .delete(deletePlaylist);

export { playlistRouter };
