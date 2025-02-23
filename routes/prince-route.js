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

router.get("/:prince_id", async (req, res) => {
  const { prince_id } = req.params;

  try {
    const prince = await Prince.findOne({ prince_id });

    if (!prince) {
      return res.status(404).json({ 
        success: false, 
        error: {code: "PRINCE_NOT_FOUND", message: "Add the prince first"}
       });
    }
    res.json({success: true, data: prince });
  } catch (err) {
    console.error("Error retrieving prince by prince_id:", err);
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to retrieve Prince" }
     });
  }
});

// Get the count of princes
router.get("/stats/count", async (req, res) => {
  const { barangay } = req.query;

  if (!barangay) {
    return res.status(400).json({ message: "Barangay name is required" });
  }

  try {
    const princeCount = await Prince.countDocuments({ barangay_id: barangay });
    res.json({ count: princeCount });
  } catch (err) {
    console.error("Error counting princes:", err);
    res.status(500).json({ message: "Failed to count princes", error: err.message });
  }
});

router.put("/:prince_id", async (req, res) => {
  const { prince_id } = req.params;
  const updatedData = req.body;

  try {
    const updatedPrince = await Prince.findOneAndUpdate(
      { prince_id },
      updatedData,
      { new: true }
    );

    if (!updatedPrince) {
      return res.status(404).json({ 
        success: false,
        error: {code: "PRINCE_NOT_FOUND", message: "Prince not found"} });
    }

    res.json({success: true, prince: updatedPrince  });
  } catch (err) {
    console.error("Error updating prince:", err);
    res.status(500).json({
      success: false,
      error: { code: "SERVER_ERROR", message: "Failed to update prince"}
     });
  }
});

router.post("/", async (req, res) => {
  const { prince_id, prince_name, barangay_name, barangay_id, king_id, king_name, precinct, purok } = req.body;

  try {
    const newPrince = new Prince({
      prince_id,
      prince_name,
      barangay_name,
      barangay_id,
      king_id,
      king_name,
      precinct,
      purok
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

export default router;
