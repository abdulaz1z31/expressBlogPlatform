import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: { type: String, required: true },
    article_id: { type: mongoose.Schema.Types.ObjectId, ref: "Article", required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    course_id: { type: mongoose.Schema.Types.ObjectId, ref: "Course" }
  },
  { timestamps: true }
);

export const Comment = mongoose.model("Comment", commentSchema);
