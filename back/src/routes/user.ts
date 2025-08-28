import { Router } from "express";
import {
  getAllUsers,
  getByIdUser,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.js";

const userRouter = Router();

userRouter.route("/").get(getAllUsers).post(createUser);
userRouter.route("/:id").get(getByIdUser).put(updateUser).delete(deleteUser);

export { userRouter };
