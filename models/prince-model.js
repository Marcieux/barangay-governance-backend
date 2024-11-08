import mongoose from "mongoose";

const princeSchema = new mongoose.Schema(
  { 
    prince_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "People",
      required: true,
      unique: true
    },
    prince_name: {
      type: String,
      required: true,
    },
    barangay_name: {
      type: String,
      required: true,
    },
    barangay_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Barangay",
      default: null,
    },
    king_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
  },
  { versionKey: false }
);

export const Prince = mongoose.model("Prince", princeSchema, "prince");
