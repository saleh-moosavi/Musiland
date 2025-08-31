import { Router } from "express";
import {
  getAllComment,
  getByIdComment,
  createComment,
  updateComment,
  deleteComment,
} from "@controllers/comment.js";

const commentRouter = Router();

commentRouter.route("/").get(getAllComment).post(createComment);
commentRouter
  .route("/:id")
  .get(getByIdComment)
  .put(updateComment)
  .delete(deleteComment);

export { commentRouter };
