import { Router } from "express";
import {
  createCourse,
  deleteCourseById,
  getAllCourses,
  getCourseById,
  updateCourseById,
} from "../controllers/index.controller.js";
import { courseSchema } from "../database/schema/index.schema.js";
import { validationMiddleware } from "../middlewares/validation.middleware.js";

export const courseRouter = Router();

courseRouter.post("/course", validationMiddleware(courseSchema), createCourse);
courseRouter.get("/course", getAllCourses);
courseRouter.get("/course/:id", getCourseById);
courseRouter.post("/course/:id", updateCourseById);
courseRouter.delete("/course/:id", deleteCourseById);
