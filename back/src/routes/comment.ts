import { Router } from "express";
import {
  getAllComment,
  createComment,
  deleteComment,
  getCommentsByUserId,
  getCommentsBySongId,
} from "@controllers/comment.js";

const commentRouter = Router();

commentRouter.route("/user/:id").get(getCommentsByUserId);
commentRouter.route("/").get(getAllComment).post(createComment);
commentRouter.route("/:id").get(getCommentsBySongId).delete(deleteComment);

export { commentRouter };
