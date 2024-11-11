import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
  updateUserById,
} from "../controllers/index.controller.js";

import { userSchema, loginSchema } from "../database/schema/index.schema.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";

export const userRouter = Router();

userRouter.post("/register", validationMiddleware(userSchema), registerUser);
userRouter.post("/login", validationMiddleware(loginSchema), loginUser);
userRouter.post("/profile");
userRouter.post("/user", validationMiddleware(userSchema), createUser);
userRouter.get("/user", getAllUsers);
userRouter.get("/user/:id", getUserById);
userRouter.post("/user/:id", updateUserById);
userRouter.delete("/user/:id", deleteUserById);
