import { ApiError, statusCodes } from "../utils/index.js";
import {
  createCourseService,
  getAllCoursesService,
  getCourseByIdService,
  updateCourseByIdService,
  deleteCourseByIdService,
} from "../service/course.service.js";

export const createCourse = async (req, res, next) => {
  try {
    const result = await createCourseService(req.body);
    const { success, error, course } = result;
    if (success) {
      res.status(statusCodes.CREATED).json({ course });
    } else {
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    next(
      new ApiError(
        error.statusCodes || statusCodes.INTERNAL_SERVER_ERROR,
        error
      )
    );
  }
};

export const getAllCourses = async (req, res, next) => {
  try {
    const result = await getAllCoursesService();
    const { success, courses, error } = result;
    if (success) {
      res.status(statusCodes.OK).json({ courses });
    } else {
      res.status(statusCodes.BAD_REQUEST).json({ error });
    }
  } catch (error) {
    next(
      new ApiError(
        error.statusCodes || statusCodes.INTERNAL_SERVER_ERROR,
        error
      )
    );
  }
};

export const getCourseById = async (req, res, next) => {
  try {
    const result = await getCourseByIdService(req.params.id);
    if (!result.success)
      throw new ApiError(statusCodes.NOT_FOUND, result.error);
    res.status(statusCodes.OK).json(result.course);
  } catch (error) {
    next(
      new ApiError(
        error.statusCodes || statusCodes.INTERNAL_SERVER_ERROR,
        error
      )
    );
  }
};

export const updateCourseById = async (req, res, next) => {
  try {
    const result = await updateCourseByIdService(req.params.id, req.body);
    if (!result.success)
      throw new ApiError(statusCodes.NOT_FOUND, result.error);
    res.status(statusCodes.OK).json(result.course);
  } catch (error) {
    next(
      new ApiError(
        error.statusCodes || statusCodes.INTERNAL_SERVER_ERROR,
        error
      )
    );
  }
};

export const deleteCourseById = async (req, res, next) => {
  try {
    const result = await deleteCourseByIdService(req.params.id);
    if (!result.success)
      throw new ApiError(statusCodes.NOT_FOUND, result.error);
    res.status(statusCodes.OK).json({ message: "Course deleted successfully" });
  } catch (error) {
    next(
      new ApiError(
        error.statusCodes || statusCodes.INTERNAL_SERVER_ERROR,
        error
      )
    );
  }
};
