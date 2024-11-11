import mongoose from "mongoose";

const courseSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    description: { type: String }
  },
  { timestamps: true }
);

export const Course = mongoose.model("Course", courseSchema);
