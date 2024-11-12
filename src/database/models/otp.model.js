import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    otp_code: { type: String, required: true },
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const OTP = mongoose.model("otp", otpSchema);
