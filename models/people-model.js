import mongoose from "mongoose";

const peopleSchema = new mongoose.Schema({
  voter_number: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  precinct: {
    type: String,
  },
  barangay_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Barangay",
    default: null,
  },
  barangay_name: {
    type: String,
  },
  referred_by_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "People",
    default: null,
  },
  referred_by: {
    type: String,
  },
  functionary: {
    type: String,
    default: null,
  },
  sector: {
    type: String,
    default: null,
  },
  role: {
    type: String,
    default: null,
  },
  number: {
    type: String,
    default: null,
  },
  purok: {
    type: String,
    default: null,
  },
  remarks: {
    type: String,
    default: null,
  },
});

export const People = mongoose.model("People", peopleSchema, "people");
