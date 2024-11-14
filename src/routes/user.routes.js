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
  changePassword,
  activeUser
} from "../controllers/index.controller.js";

import { userSchema, loginSchema } from "../database/schema/index.schema.js";
import { pagination, validationMiddleware } from "../middlewares/validation.middleware.js";
import { checkTokens } from "../middlewares/checktoken.middleware.js";
import { isSelfRoleGuard, roleGuard } from "../middlewares/index.middleware.js";


export const userRouter = Router();

userRouter.post("/register", validationMiddleware(userSchema), registerUser);//register qilganda isActive false
userRouter.post("/login", validationMiddleware(loginSchema), loginUser);//otp bilan ham otpsiz ham kirsa boladi 
userRouter.post("/activate", activeUser);//isActive ni ture qilish otp siz kirilganda
userRouter.post("/profile", checkTokens, userProfileController);
userRouter.post("/forget/password", checkTokens, forgetPassword)//bu link va otp jonatadi 
userRouter.post("/forget/password/:id", changePassword)//bunda forgotdagi otp bilan newPassword bersa boladi 
userRouter.post("/admin", checkTokens, roleGuard("admin", "superAdmin"),  createUser);//bunda ham birinchi admin yoki superAdmin user yaratadi u user login qilganda opt bilan yoki active sorov bilan 

//bularni hammasida userini isActive active bolsa ishlaydi
userRouter.get("/user", checkTokens, roleGuard("admin", "superAdmin"), pagination, getAllUsers);
userRouter.get("/user/:id",checkTokens, isSelfRoleGuard("admin", "superAdmin"), getUserById);
userRouter.post("/user/:id", checkTokens, isSelfRoleGuard("admin", "superAdmin"), updateUserById);
userRouter.delete("/user/:id", checkTokens, isSelfRoleGuard("admin", "superAdmin"), deleteUserById);
