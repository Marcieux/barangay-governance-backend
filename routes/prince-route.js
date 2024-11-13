import express from "express";
import { Prince } from "../models/prince-model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const prince = await Prince.find();
    res.json(prince);
  } catch (err) {
    console.error("Error retrieving prince:", err);
    res
      .status(500)
      .json({ message: "Failed to retrieve prince", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const prince = await Prince.findById(id);

    if (!prince) {
      return res.status(404).json({ message: "Prince not found" });
    }
    res.json(prince);
  } catch (err) {
    console.error("Error retrieving prince by ID:", err);
    res.status(500).json({ message: "Failed to retrieve prince", error: err.message });
  }
});

router.post("/", async (req, res) => {
  const { prince_id, prince_name, barangay_name, barangay_id, king_id } = req.body;

  try {
    const newPrince = new Prince({
      prince_id,
      prince_name,
      barangay_name,
      barangay_id,
      king_id,
    });

    await newPrince.save();
    res.status(201).json(newPrince);
  } catch (err) {
    console.error("Error creating prince:", err);
    res
      .status(500)
      .json({ message: "Failed to create prince", error: err.message });
  }
});

router.put("/:id/general", async (req, res) => {
  const { id } = req.params;
  const { general } = req.body;

  if (!Array.isArray(general) || general.length === 0) {
    return res
      .status(400)
      .json({ message: "Generals array is required and cannot be empty." });
  }

  try {
    const updatedPrince = await Prince.findByIdAndUpdate(
      id,
      { $addToSet: { general: { $each: general } } },
      { new: true }
    );

    if (!updatedPrince) {
      return res.status(404).json({ message: "Barangay not found" });
    }

    res.json({
      message: "Generals added to barangay successfully",
      prince: updatedPrince,
    });
  } catch (err) {
    console.error("Error updating barangay with generals:", err);
    res.status(500).json({
      message: "Failed to update barangay with generals",
      error: err.message,
    });
  }
});

export default router;
