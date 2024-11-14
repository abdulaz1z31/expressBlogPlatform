import { Course } from "../database/models/course.model.js";

export const createCourseService = async (data) => {
  try {
    const course = new Course(data);
    await course.save();
    return { success: true, error: null, course };
  } catch (error) {
    return { success: false, error };
  }
};

export const getAllCoursesService = async () => {
  try {
    const courses = await Course.find();
    if (!courses.length) {
      return { success: false, error: "Courses not found" };
    }
    return { success: true, courses };
  } catch (error) {
    return { success: false, error };
  }
};

export const getCourseByIdService = async (id) => {
  try {
    const course = await Course.findById(id);
    if (!course) {
      return { success: false, error: "Course not found" };
    }
    return { success: true, course };
  } catch (error) {
    return { success: false, error };
  }
};

export const updateCourseByIdService = async (id, data) => {
  try {
    const course = await Course.findByIdAndUpdate(id, data, { new: true });
    if (!course) {
      return { success: false, error: "Course not found" };
    }
    return { success: true, course };
  } catch (error) {
    return { success: false, error };
  }
};

export const deleteCourseByIdService = async (id) => {
  try {
    const course = await Course.findByIdAndDelete(id);
    if (!course) {
      return { success: false, error: "Course not found" };
    }
    return { success: true };
  } catch (error) {
    return { success: false, error };
  }
};
