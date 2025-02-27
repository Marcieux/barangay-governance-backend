import mongoose from "mongoose";

const leaderSchema = new mongoose.Schema(
  {
    leader_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "People",
      required: true,
    },
    leader_name: {
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
    member: [{ type: mongoose.Schema.Types.ObjectId, ref: "Member" }]
  },
  { versionKey: false }
);

export const Leader = mongoose.model("Leader", leaderSchema, "leader");
