import { Router } from "express";
import {
  createCourse,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  updateCourseById,
} from "../controllers/index.controller.js";
import { courseSchema } from "../database/schema/index.schema.js";

import { 
  validationMiddleware,
  checkTokens,
  roleGuard 
} from "../middlewares/index.middleware.js";

export const courseRouter = Router();

courseRouter.post("/course", checkTokens, roleGuard("admin", "superAdmin"), validationMiddleware(courseSchema), createCourse);
courseRouter.get("/course", checkTokens, roleGuard("admin", "superAdmin"), getAllCourses);
courseRouter.get("/course/:id", checkTokens, roleGuard("admin", "superAdmin"), getCourseById);
courseRouter.post("/course/:id", checkTokens, roleGuard("admin", "superAdmin"), updateCourseById);
courseRouter.delete("/course/:id", checkTokens, roleGuard("admin", "superAdmin"), deleteCourseById);
