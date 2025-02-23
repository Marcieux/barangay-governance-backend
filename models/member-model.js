import mongoose from "mongoose";

const memberSchema = new mongoose.Schema(
  {
    member_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "People",
      required: true,
    },
    member_name: {
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
      required: true,
    },
    prince_name: {
      type: String,
      required: true,
    },
    general_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "General",
      required: true,
    },
    general_name: {
      type: String,
      required: true,
    },
    leader_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Leader",
      required: true,
    },
    leader_name: {
      type: String,
      required: true,
    },
  },
  { versionKey: false }
);

export const Member = mongoose.model("Member", memberSchema, "member");
