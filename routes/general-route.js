import express from "express";
import { General } from "../models/general-model.js";
import { Prince } from "../models/prince-model.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const general = await General.find();
    res.json(general);
  } catch (err) {
    console.error("Error retrieving generals:", err);
    res
      .status(500)
      .json({ message: "Failed to retrieve generals", error: err.message });
  }
});

router.get("/:general_id", async (req, res) => {
  const { general_id } = req.params;

  try {
    const general = await General.findOne({ general_id });

    if (!general) {
      return res.status(404).json({
        success: false,
        error: { code: "GENERAL_NOT_FOUND", message: "Add the general first" },
       });
    }
    res.json({ success: true, data: general });
  } catch (err) {
    console.error("Error retrieving general by general_id:", err);
    res.status(500).json({
      success: false,
      error: { code: "GENERAL_NOT_FOUND", message: "Failed to retrieve General" },
    });
  }
});

// Get the count of generals
router.get("/stats/count", async (req, res) => {
  const { barangay } = req.query;

  if (!barangay) {
    return res.status(400).json({ message: "Barangay name is required" });
  }

  try {
    const generalCount = await General.countDocuments({  barangay_id: barangay });
    res.json({ count: generalCount });
  } catch (err) {
    console.error("Error counting generals:", err);
    res.status(500).json({ message: "Failed to count generals", error: err.message });
  }
});

router.put("/:general_id", async (req, res) => {
  const { general_id } = req.params;
  const updatedData = req.body;

  try {
    const updatedGeneral = await General.findOneAndUpdate(
      { general_id },
      updatedData,
      { new: true }
    );

    if (!updatedGeneral) {
      return res.status(404).json({
        success: false,
        error: { code: "GENERAL_NOT_FOUND", message: "General not found" },
       });
    }

    res.json({success: true, data: updatedGeneral  });
  } catch (err) {
    console.error("Error updating general:", err);
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to update general" },
    });
  }
});

// POST route to create or update a general
router.post("/", async (req, res) => {
  const {
    general_id,
    general_name,
    precinct,
    purok,
    barangay_id,
    barangay_name,
    king_id,
    king_name,
    prince_id,
    prince_name,
  } = req.body;

  try {
    // Create or update the general in the General collection
    const updatedGeneral = await General.findOneAndUpdate(
      { general_id }, // Match by general_id to either update or create
      {
        general_name,
        precinct,
        purok,
        barangay_name,
        barangay_id,
        king_id,
        king_name,
        prince_id,
        prince_name,
      },
      { upsert: true, new: true }
    );

    // Now, update the Prince document by adding the new general to its 'general' array
    if (prince_id && updatedGeneral._id) {
      await Prince.findOneAndUpdate(
        { prince_id }, // Use prince_id explicitly
        { $addToSet: { general: updatedGeneral.general_id } },
        { new: true }
      );
    }

    res.status(201).json(updatedGeneral);
  } catch (err) {
    res.status(500).json({
      message: "Failed to create or update general",
      error: err.message,
    });
  }
});

export default router;
