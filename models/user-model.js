import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true, // Removes extra spaces
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["superadmin", "admin", "encoder"], // Allowed roles
      required: true,
    },
  },
  { versionKey: false }
);

export const User = mongoose.model("User", userSchema, "user");
