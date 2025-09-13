import { Router } from "express";
import {
  getAllComment,
  createComment,
  updateComment,
  deleteComment,
  getCommentsBySongId,
} from "@controllers/comment.js";

const commentRouter = Router();

commentRouter.route("/").get(getAllComment).post(createComment);
commentRouter
  .route("/:id")
  .get(getCommentsBySongId)
  .put(updateComment)
  .delete(deleteComment);

export { commentRouter };
