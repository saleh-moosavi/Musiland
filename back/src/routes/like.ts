import { Router } from "express";
import { toggleLike, getUserLiked } from "@controllers/like.js";

const likeRouter = Router();

likeRouter.route("/").post(getUserLiked).put(toggleLike);

export { likeRouter };
