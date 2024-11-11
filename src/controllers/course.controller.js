import { ApiError } from "../utils/index.js";
import { Course } from "../database/models/course.model.js";

export const createCourse = async (req, res, next) => {
    try {
        const course = new Course(req.body);
        await course.save();
        res.status(201).json(course);
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};

export const getAllCourses = async (req, res, next) => {
    try {
        const courses = await Course.find();
        res.status(200).json(courses);
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};

export const getCourseById = async (req, res, next) => {
    try {
        const course = await Course.findById(req.params.id);
        if (!course) throw new ApiError(404, "Course not found");
        res.status(200).json(course);
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};

export const updateCourseById = async (req, res, next) => {
    try {
        const course = await Course.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!course) throw new ApiError(404, "Course not found");
        res.status(200).json(course);
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};

export const deleteCourseById = async (req, res, next) => {
    try {
        const course = await Course.findByIdAndDelete(req.params.id);
        if (!course) throw new ApiError(404, "Course not found");
        res.status(200).json({ message: "Course deleted successfully" });
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};
