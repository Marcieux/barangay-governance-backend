import mongoose from "mongoose";

const generalSchema = new mongoose.Schema(
  {
    general_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "People",
      required: true,
    },
    general_name: {
      type: String,
      required: true,
    },
    precinct: {
      type: String,
    },
    purok: {
      type: String,
    },
    barangay_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Barangay",
      default: null,
    },
    barangay_name: {
      type: String,
      required: true,
    },
    king_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    king_name: {
      type: String,
      required: true,
    },
    prince_id: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "Prince",
      required: true 
    },
    prince_name: { 
      type: String, 
      required: true 
    },
    leader: [{ type: mongoose.Schema.Types.ObjectId, ref: "Leader" }]
  },
  { versionKey: false }
);

export const General = mongoose.model("General", generalSchema, "general");
