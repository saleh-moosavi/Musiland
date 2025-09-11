import { Router } from "express";
import { changeLike, getUserLiked } from "@controllers/like.js";

const likeRouter = Router();

likeRouter.route("/").post(getUserLiked).put(changeLike);

export { likeRouter };
