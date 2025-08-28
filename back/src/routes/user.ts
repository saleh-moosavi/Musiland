import { Router } from "express";
import {
  addUser,
  deleteAllUsers,
  deleteUser,
  editUser,
  getAllUsers,
  getSingleUser,
} from "../controllers/user.js";

const userRouter = Router();

userRouter.get("/", getAllUsers);
userRouter.get("/:id", getSingleUser);
userRouter.post("/add", addUser);
userRouter.put("/edit/:id", editUser);
userRouter.delete("/delete/:id", deleteUser);
userRouter.delete("/delete-all", deleteAllUsers);

export { userRouter };
