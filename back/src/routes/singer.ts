import { Router } from "express";
import {
  getAllSinger,
  getByIdSinger,
  createSinger,
  updateSinger,
  deleteSinger,
} from "@controllers/singer.js";

const singerRouter = Router();

singerRouter.get("/", getAllSinger);
singerRouter.post("/", createSinger);
singerRouter.get("/:id", getByIdSinger);
singerRouter.put("/:id", updateSinger);
singerRouter.delete("/:id", deleteSinger);

export { singerRouter };
