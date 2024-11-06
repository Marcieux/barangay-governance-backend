import express from "express";
import { Barangay } from "../models/barangays-model.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const barangay = await Barangay.find();
    res.json(barangay);
  } catch (err) {
    console.error("Error retrieving barangays:", err);
    res
      .status(500)
      .json({ message: "Failed to retrieve barangays", error: err.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params; 
  const { king_id, king_name } = req.body;

  try {
    const updatedBarangay = await Barangay.findByIdAndUpdate(
      id, 
      { king_id, king_name },
      { new: true, upsert: false }
    );

    if (!updatedBarangay) {
      return res.status(404).json({ message: "Barangay not found" });
    }

    res.json({ message: "King added successfully", barangay: updatedBarangay });
  } catch (err) {
    console.error("Error updating king:", err);
    res
      .status(500)
      .json({ message: "Failed to update king", error: err.message });
  }
});

export default router;
