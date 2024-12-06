import mongoose from "mongoose";

const princeSchema = new mongoose.Schema(
  { 
    prince_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "People",
      required: true,
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
    general: [{ type: mongoose.Schema.Types.ObjectId, ref: "General" }]
  },
  { versionKey: false }
);

export const Prince = mongoose.model("Prince", princeSchema, "prince");
