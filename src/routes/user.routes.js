import { Router } from "express";
import {
  checkOtp,
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
  updateUserById,
  userProfileController,
  forgetPasswrod
} from "../controllers/index.controller.js";

import { userSchema, loginSchema } from "../database/schema/index.schema.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";
import { checkTokens } from "../middlewares/checktoken.middleware.js";
import { isSelfRoleGuard, roleGuard } from "../middlewares/index.middleware.js";

export const userRouter = Router();

userRouter.post("/register", validationMiddleware(userSchema), registerUser);
userRouter.post("/login", validationMiddleware(loginSchema), loginUser);
userRouter.post("/checkotp", checkTokens, checkOtp)//birinchi login qilib keyin active qiladi gan qildim 
userRouter.post("forget/password", forgetPasswrod)
userRouter.post("/profile", checkTokens, userProfileController);
userRouter.post("/admin", checkTokens, roleGuard("admin", "superAdmin"),  createUser);
userRouter.get("/user", checkTokens, roleGuard("admin", "superAdmin"), getAllUsers);
userRouter.get("/user/:id",checkTokens, isSelfRoleGuard("admin", "superAdmin"), getUserById);
userRouter.post("/user/:id", checkTokens, isSelfRoleGuard("admin", "superAdmin"), updateUserById);
userRouter.delete("/user/:id", checkTokens, isSelfRoleGuard("admin", "superAdmin"), deleteUserById);
