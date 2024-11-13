import { Router } from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  loginUser,
  registerUser,
  updateUserById,
  userProfileController,
  forgetPassword,
  changePassword
} from "../controllers/index.controller.js";

import { userSchema, loginSchema } from "../database/schema/index.schema.js";
import { pagination, validationMiddleware } from "../middlewares/validation.middleware.js";
import { checkTokens } from "../middlewares/checktoken.middleware.js";
import { isSelfRoleGuard, roleGuard } from "../middlewares/index.middleware.js";


export const userRouter = Router();

userRouter.post("/register", validationMiddleware(userSchema), registerUser);
userRouter.post("/login", validationMiddleware(loginSchema), loginUser);
userRouter.post("/profile", checkTokens, userProfileController);
userRouter.post("/forget/password", checkTokens, forgetPassword)
userRouter.post("/forget/password/:id", changePassword)
//hozircha bitta muamo bor yani user ni otpsi ozgarib ketayapti password change bolganda
//shuni korishim kk

userRouter.post("/admin", checkTokens, roleGuard("admin", "superAdmin"),  createUser);
userRouter.get("/user", checkTokens, roleGuard("admin", "superAdmin"), pagination, getAllUsers);
userRouter.get("/user/:id",checkTokens, isSelfRoleGuard("admin", "superAdmin"), getUserById);
userRouter.post("/user/:id", checkTokens, isSelfRoleGuard("admin", "superAdmin"), updateUserById);
userRouter.delete("/user/:id", checkTokens, isSelfRoleGuard("admin", "superAdmin"), deleteUserById);
