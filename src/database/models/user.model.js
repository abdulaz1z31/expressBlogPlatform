import { hash, genSalt, compare } from "bcrypt";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    isActive: {type: Boolean, enum: [true, false], default: false},
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["user", "admin", "superAdmin", "author"],
      default: "user",
    },
  },
  { timestamps: true }
);
userSchema.pre("save", async function () {
  const salt = await genSalt(10);
  const hashPassword = await hash(this.password, salt);
  this.password = hashPassword;
});

userSchema.method("compare", function (userPassword) {
  return compare(userPassword, this.password);
});
export const User = mongoose.model("User", userSchema);
