import { ApiError, statusCodes } from "../utils/index.js";
import {
  createCourseService,
  getAllCoursesService,
  getCourseByIdService,
  updateCourseByIdService,
  deleteCourseByIdService,
} from "../service/course.service.js";
import { logger } from "../utils/logger.js"; 

export const createCourse = async (req, res, next) => {
  try {
    const result = await createCourseService(req.body);
    const { success, error, course } = result;
    if (success) {
      logger.info("Course created successfully", { course });
      res.status(statusCodes.CREATED).json({ course });
    } else {
      logger.warn("Course creation failed", { error });
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    logger.error("Error in createCourse", { error });
    next(new ApiError(error.statusCodes, error));
  }
};

export const getAllCourses = async (req, res, next) => {
  try {
    const result = await getAllCoursesService();
    const { success, courses, error } = result;
    if (success) {
      logger.info("Fetched all courses successfully", { courses });
      res.status(statusCodes.OK).json({ courses });
    } else {
      logger.warn("Fetching courses failed", { error });
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    logger.error("Error in getAllCourses", { error });
    next(new ApiError(error.statusCodes, error));
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const result = await getCourseByIdService(req.params.id);
    if (!result.success) {
      logger.warn("Course not found", { id: req.params.id });
      throw new ApiError(statusCodes.NOT_FOUND, result.error);
    }
    logger.info("Fetched course by ID successfully", { course: result.course });
    res.status(statusCodes.OK).json(result.course);
  } catch (error) {
    logger.error("Error in getCourseById", { error });
    next(new ApiError(error.statusCodes, error));
  }
};

export const updateCourseById = async (req, res, next) => {
  try {
    const result = await updateCourseByIdService(req.params.id, req.body);
    if (!result.success) {
      logger.warn("Course update failed", { id: req.params.id });
      throw new ApiError(statusCodes.NOT_FOUND, result.error);
    }
    logger.info("Course updated successfully", { course: result.course });
    res.status(statusCodes.OK).json(result.course);
  } catch (error) {
    logger.error("Error in updateCourseById", { error });
    next(new ApiError(error.statusCodes, error));
  }
};

export const deleteCourseById = async (req, res, next) => {
  try {
    const result = await deleteCourseByIdService(req.params.id);
    if (!result.success) {
      logger.warn("Course deletion failed", { id: req.params.id });
      throw new ApiError(statusCodes.NOT_FOUND, result.error);
    }
    logger.info("Course deleted successfully", { id: req.params.id });
    res.status(statusCodes.OK).json({ message: "Course deleted successfully" });
  } catch (error) {
    logger.error("Error in deleteCourseById", { error });
    next(new ApiError(error.statusCodes, error));
  }
};
