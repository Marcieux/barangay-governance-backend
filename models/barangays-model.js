import mongoose from "mongoose";

const barangaySchema = mongoose.Schema({
  barangay_name: { type: String, required: true },
  municipality: { type: String, required: true },
  king_id: { type: mongoose.Schema.Types.ObjectId, ref: "People", default: null },
  king_name: { type: String, default: null },
  prince_id: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prince", required: true }],
  cafgu: [{ type: mongoose.Schema.Types.ObjectId, ref: "People", required: true }],
  purok_chair: [{ type: mongoose.Schema.Types.ObjectId, ref: "People", required: true }],
  tagapamayapa: [{ type: mongoose.Schema.Types.ObjectId, ref: "People", required: true }],
  bhw: [{ type: mongoose.Schema.Types.ObjectId, ref: "People", required: true }],
  tanod: [{ type: mongoose.Schema.Types.ObjectId, ref: "People", required: true }],
  public_safety: [{ type: mongoose.Schema.Types.ObjectId, ref: "People", required: true }],
  bantay_dagat: [{ type: mongoose.Schema.Types.ObjectId, ref: "People", required: true }],
  coastal: [{ type: mongoose.Schema.Types.ObjectId, ref: "People", required: true }],
});

export const Barangay = mongoose.model("Barangay", barangaySchema, "barangay");
