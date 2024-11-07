import mongoose from "mongoose";

const barangaySchema = mongoose.Schema({
  barangay_name: { type: String, required: true },
  king_id: { type: mongoose.Schema.Types.ObjectId, ref: "People", default: null },
  king_name: { type: String, default: null },
  prince: [{ type: mongoose.Schema.Types.ObjectId, ref: "Prince", required: true }]
});

export const Barangay = mongoose.model("Barangay", barangaySchema, "barangay");
