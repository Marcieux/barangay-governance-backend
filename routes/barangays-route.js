import express from "express";
import { Barangay } from "../models/barangays-model.js";

const router = express.Router();
router.get("/", async (req, res) => {
  try {
    const barangay = await Barangay.find();
    console.log("Fetched barangays:", barangay); // Log the fetched barangays
    res.json(barangay);
  } catch (err) {
    console.error("Error retrieving barangays:", err); // Log error details
    res
      .status(500)
      .json({ message: "Failed to retrieve barangays", error: err.message });
  }
});

export default router;
